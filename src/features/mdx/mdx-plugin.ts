import { PluggableList } from "unified";
import rehypeShiki from "@shikijs/rehype";

const shikiPlugin = [
    rehypeShiki, 
    { 
        theme: "github-dark" 
    },
] satisfies PluggableList[number];

export const rehypePlugin = [shikiPlugin] satisfies PluggableList;
