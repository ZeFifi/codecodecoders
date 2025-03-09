import { Hero } from '@/components/Hero'
import { Badge } from '@/components/ui/Badge'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { getPosts } from '@/lib/posts'
import Link from 'next/link'

export default async function Home() {
    const posts = await getPosts()
    return (
        <>
            <Hero />
            {posts.map((post) => {
                if (!post.published) {
                    return (
                        <div
                            key={post.slug}
                            className="text-center text-gray-600"
                        >
                            Il n'y a pas de post publié pour le moment
                        </div>
                    )
                }
                return (
                    <Link
                        href={`/posts/${post.slug}`}
                        className="no-effect"
                        key={post.slug}
                    >
                        <Card className="rounded-md border-gray-200 font-inter shadow-none">
                            <CardHeader>
                                <CardTitle className="font-robotoCondensed text-xl text-[#3367c2]">
                                    {post.title}
                                </CardTitle>
                                <time
                                    className="text-xs text-gray-600"
                                    style={{ marginTop: 0 }}
                                >
                                    {new Date(
                                        post.publishedAt
                                    ).toLocaleDateString('fr-FR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </time>
                                <CardDescription className="mt-4 font-lora">
                                    {post.description}
                                </CardDescription>
                                <Badge
                                    category={post.category}
                                    className="w-fit"
                                    noLink
                                >
                                    {post.category}
                                </Badge>
                            </CardHeader>
                        </Card>
                    </Link>
                )
            })}
        </>
    )
}
