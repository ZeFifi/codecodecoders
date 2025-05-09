import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const posts = await getCollection("posts");
  return rss({
    title: "CodeCodeCoders",
    description:
      "Apprenez, mais surtout progressez avec des articles concis, clairs et en français !",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/post/${post.slug}/`, // Corrected template literal
      // You can add more properties here, like author, categories, etc.
      // customData for items can also be used if needed.
    })),
    customData: `<language>fr-fr</language>`, // Set to French, adjust if needed
    // Optional: to remove trailing slashes from URLs if configured in astro.config.mjs
    // trailingSlash: false,
  });
}
