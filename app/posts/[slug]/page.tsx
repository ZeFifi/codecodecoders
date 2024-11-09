import { Mdx } from "@/features/mdx/Mdx";
import { getPost } from "@/lib/posts";
import { notFound } from "next/navigation";

export default async function RoutePage(props: { params: { slug: string } }) {
  const post = await getPost(props.params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <Mdx>{post.content}</Mdx>
    </div>
  );
}
