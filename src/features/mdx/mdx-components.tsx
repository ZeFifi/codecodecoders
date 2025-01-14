import { MdxYouTube } from "./MdxYouTube";
import type { MDXRemoteProps } from "next-mdx-remote-client/rsc";

type MDXComponents = NonNullable<MDXRemoteProps["components"]>;

export const MDX_COMPONENTS: MDXComponents = {
  YouTube: MdxYouTube,

  h1: (props) => <h1 className="text-3xl font-bold" {...props} />,

  h2: (props) => <h2 className="text-2xl font-bold" {...props} />,

  p: (props) => <p className="mb-4 font-inter" {...props} />,

  ul: (props) => (
    <ul
      className="mb-4 list-inside list-disc font-inter leading-none"
      {...props}
    />
  ),
};
