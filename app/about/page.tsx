import { Mdx } from "@/features/mdx/Mdx";
import { getAboutContent } from "@/lib/posts";

export default async function About() {
  const aboutContent = await getAboutContent();

  return (
    <div className="prose prose-lg mx-auto">
      <Mdx>{aboutContent.content}</Mdx>
    </div>
  );
}