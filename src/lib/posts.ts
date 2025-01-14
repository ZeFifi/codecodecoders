import path from "path";
import fs from "fs/promises";
import matter from "gray-matter";
import { z } from "zod";

const postsDirectory = path.join(process.cwd(), "content");

const PostSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishedAt: z.coerce.string(),
  published: z.boolean().optional().default(false),
  author: z
    .object({
      name: z.string(),
      link: z.string().optional(),
    })
    .optional(),
});

type Post = z.infer<typeof PostSchema> & {
  slug: string;
  content: string;
};

export const getPosts = async () => {
  const files = await fs.readdir(postsDirectory);
  const fileNames = files.filter((fileName) => fileName.endsWith(".mdx"));

  const posts: Post[] = [];

  for await (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContent = await fs.readFile(filePath, "utf-8");
    const frontMatter = matter(fileContent);

    const safeData = PostSchema.safeParse(frontMatter.data);

    if (!safeData.success) {
      console.error(`Error parsing: ${fileName}`);
      continue;
    }

    if (!safeData.data.published && process.env.NODE_ENV !== "development") {
      continue;
    }

    posts.push({
      ...safeData.data,
      slug: fileName.replace(/^\d+-/, "").replace(".mdx", ""),
      content: frontMatter.content,
    });
  }

  return posts;
};

export const getPost = async (slug: string) => {
  const posts = await getPosts();
  return posts.find((post) => post.slug === slug);
};
