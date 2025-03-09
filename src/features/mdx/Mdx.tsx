import { MDX_COMPONENTS } from "@/features/mdx/mdx-components";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { Suspense } from "react";
import { rehypePlugin } from "./mdx-plugin";

export const Mdx = ({ children }: { children: string }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="whitespace-pre-line">
        <MDXRemote 
          source={children} 
          options={{
            mdxOptions: {
              rehypePlugins: rehypePlugin
            }
          }} 
          components={MDX_COMPONENTS} />
      </div>
    </Suspense>
  );
};
