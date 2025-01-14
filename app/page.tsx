import { Hero } from "@/components/Hero";
import {
  Card,
  CardDescription,
  CardFooter,
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
          <Card key={post.slug} className="font-inter">
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={`/posts/${post.slug}`}>Lire</Link>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
