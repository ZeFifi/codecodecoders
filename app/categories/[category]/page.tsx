import { Badge } from "@/components/ui/Badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPosts } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ category: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const posts = await getPosts();
  const categoryPosts = posts.filter(
    (post) => post.category === category
  );

  if (categoryPosts.length === 0) {
    notFound();
  }

  return (
    <div>
      <header className="mb-8">
        <div className="flex items-center space-x-2">
          <div className="bg-white border border-gray-200 rounded-md p-2 w-fit">
            <Link href="/" className="no-effect">
              <ArrowLeft className="size-4 text-[#3367c2]" />
            </Link>
          </div>
          <h1 className="font-robotoCondensed text-4xl font-bold tracking-tight">
            Catégorie <span className="text-[#3367c2]">{category}</span>
          </h1>
        </div>
      </header>

      {categoryPosts.map((post) => (
        <Link href={`/posts/${post.slug}`} className="no-effect" key={post.slug}>
          <Card className="shadow-none border-gray-200 rounded-md">
            <CardHeader>
              <CardTitle className="text-[#3367c2] text-xl font-robotoCondensed">{post.title}</CardTitle>
              <time className="text-xs text-gray-600" style={{ marginTop: 0 }}>
                {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <CardDescription className="mt-4 font-lora">{post.description}</CardDescription>
              <Badge category={post.category} className="w-fit" noLink>
                {post.category}
              </Badge>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}