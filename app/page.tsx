import { Hero } from "@/components/Hero";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPosts } from "@/lib/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();
  return (
    <div>
      <Hero />
      {posts.map((post) => {
        return (
          <Link href={`/posts/${post.slug}`} className="no-effect">
            <Card key={post.slug} className="font-inter shadow-none border-gray-200 rounded-md">
              <CardHeader>
                <CardTitle className="text-[#3367c2] text-xl">{post.title}</CardTitle>
                <time className="text-xs text-gray-600" style={{marginTop: 0}}>
                  {new Date(post.publishedAt).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                <CardDescription className="mt-4">{post.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
