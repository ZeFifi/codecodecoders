import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { z } from "zod";

const contentDirectory = path.join(process.cwd(), "content");

export const PostSchema = z.object({
  title: z.string(),
  description: z.string(),
  published: z.boolean().optional().default(true),
  publishedAt: z.string().default(new Date().toISOString()),
  author: z.object({
    name: z.string(),
    link: z.string().optional()
  }).optional()
});

export const AboutSchema = z.object({
  title: z.string()
});

export type Post = z.infer<typeof PostSchema> & {
  slug: string;
  content: string;
};

export type About = z.infer<typeof AboutSchema> & {
  slug: string;
  content: string;
};

export const getContent = async <T extends z.ZodType>(
  schema: T,
  subDirectory?: string
) => {
  const targetDirectory = subDirectory 
    ? path.join(contentDirectory, subDirectory)
    : contentDirectory;

  const files = await fs.readdir(targetDirectory);
  const fileNames = files.filter((fileName) => fileName.endsWith(".mdx"));

  const contents: (z.infer<T> & { slug: string; content: string })[] = [];

  for await (const fileName of fileNames) {
    const filePath = path.join(targetDirectory, fileName);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const frontMatter = matter(fileContent);

    const safeData = schema.safeParse(frontMatter.data);

    if (!safeData.success) {
      console.error(`Error parsing: ${fileName}`);
      continue;
    }

    contents.push({
      ...safeData.data,
      slug: fileName.replace(/^\d+-/, "").replace(".mdx", ""),
      content: frontMatter.content,
    });
  }

  return contents;
};

export const getPosts = () => getContent(PostSchema, "posts");
export const getPost = async (slug: string) => {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
};

export const getAboutContent = async () => {
  const aboutContent = await getContent(AboutSchema, "about");
  return aboutContent[0];
};
