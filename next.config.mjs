// next.config.js
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeCustomEmoji from "rehype-custom-emoji";
import remarkFootnote from "remark-footnotes";
import remarkMath from "remark-math";
import remarkImages from "remark-images";
import remarkGfm from "remark-gfm";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import { emojis } from "./emoji";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure pageExtensions to include md and mdx
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Optionally, add any other Next.js config below
  reactStrictMode: true,
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    // If you use remark-gfm, you'll need to use next.config.mjs
    // as the package is ESM only
    // https://github.com/remarkjs/remark-gfm#install
    remarkPlugins: [
      remarkMath,
      remarkImages,
      remarkGfm,
      [remarkFootnote, { inlineNotes: true }],
    ],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      rehypeToc,
      rehypeAutolinkHeadings,
      [rehypeCustomEmoji, { emojis }],
    ],
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  },
});
export default withMDX(nextConfig);
