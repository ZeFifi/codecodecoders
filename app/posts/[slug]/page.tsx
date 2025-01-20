import { Mdx } from "@/features/mdx/Mdx";
import { getPost } from "@/lib/posts";
import { LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post non trouvé' };
  return { title: post.title };
}

export default async function RoutePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="w-full">
      <header className="mb-32 mt-8">
        <div className="flex flex-col items-center">
            <Badge category={post.category}>{post.category}</Badge>
          <h1 className="font-robotoCondensed text-4xl font-bold tracking-tight my-2">
            {post.title}
          </h1>
          <p className="text-sm text-center text-gray-600 mb-4 font-lora">{post.description}</p>
        </div>


        <div className="flex flex-col items-center text-sm text-gray-600">
          <div className="flex gap-2">
            <img src="https://mighty.tools/mockmind-api/content/human/125.jpg" alt={post.author?.name} className="size-10 rounded-full" />
          <div className="flex flex-col">
            <time>
              {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <div className="flex items-center">
              {post.author && (
                <span className="mr-1">
                  {post.author.link && (
                    <a
                    href={post.author.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-blue-600 no-effect underline"
                    aria-label={`Profil de ${post.author.name}`}
                    >
                      {post.author.name}
                    </a>
                  )}
                </span>
              )}
              <LinkedInLogoIcon color="#0b66c2" />
            </div>
          </div>
        </div>
        </div>
      </header>

      <div className="prose prose-lg mx-auto">
        <Mdx>{post.content}</Mdx>
      </div>
    </article>
  );
}
