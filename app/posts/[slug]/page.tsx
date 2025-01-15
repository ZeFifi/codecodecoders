import { Mdx } from "@/features/mdx/Mdx";
import { getPost } from "@/lib/posts";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function RoutePage(props: { params: { slug: string } }) {
  const post = await getPost(props.params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full">
      <header className="mb-8">
        <div className="flex items-center space-x-2">
        <div className="bg-gray-200 rounded-md p-2 w-fit">
          <Link href="/" className="">
            <ArrowLeft className="size-4 text-[#3367c2]" />
        </Link></div>

        <h1 className="font-sans text-4xl font-bold tracking-tight">
          {post.title}
        </h1>

        </div>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <span>Le</span>
          <time>
            {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.author && (
            <span className="flex items-center space-x-1">
              <span>par</span>
              {post.author.link ? (
                <a
                  href={post.author.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-200 hover:text-blue-600"
                  aria-label={`Profil de ${post.author.name}`}
                >
                  {post.author.name}
                </a>
              ) : (
                <span>{post.author.name}</span>
              )}
            </span>
          )}
          <LinkedInLogoIcon />
        </div>
      </header>

      <div className="prose prose-lg mx-auto">
        <Mdx>{post.content}</Mdx>
      </div>
    </article>
  );
}
