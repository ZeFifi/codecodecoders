import { MdxYouTube } from "./MdxYouTube";
import type { MDXRemoteProps } from "next-mdx-remote-client/rsc";

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;

export const MDX_COMPONENTS: MDXComponents = {
  YouTube: MdxYouTube,

  h1: (props) => <h1 className="text-3xl font-bold font-robotoCondensed" {...props} />,

  h2: (props) => <h2 className="text-2xl font-bold -mb-4 font-robotoCondensed" {...props} />,

  p: (props) => <p className="font-lora" {...props} />,

  ul: (props) => (
    <ul
      className="-mt-6 list-inside list-disc font-lora leading-none"
      {...props}
    />
  ),

  li: (props) => <li className="leading-normal -mt-2" {...props} />,
};
