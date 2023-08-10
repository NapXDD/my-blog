import fs from "fs";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { emojis } from "./emoji";
import rehypeToc from "rehype-toc";
import rehypeSlug from "rehype-slug";
import rehypeKatex from "rehype-katex";
import rehypeCustomEmoji from "rehype-custom-emoji";
import remarkFootnote from "remark-footnotes";
import remarkMath from "remark-math";
import remarkImages from "remark-images";
import remarkGfm from "remark-gfm";
import path from "path";
import { Post } from "@/component/blog/interace";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

export const POSTS_PATH = path.join(process.cwd(), "app/posts");

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export const getAllPosts = (): Post[] =>
  postFilePaths
    .map((filePath) => {
      const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
      const { content, data } = matter(source);
      return { content, data, filePath } as Post;
    })
    .sort((a, b) => (new Date(a.data.date) > new Date(b.data.date) ? -1 : 1));

export const mdxSerialize = (content: string, data: { [key: string]: any }) =>
  serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        remarkMath,
        remarkImages,
        remarkGfm,
        [remarkFootnote, { inlineNotes: true }],
        [
          require("remark-prism"),
          {
            plugins: ["line-numbers", "diff-highlight"],
          },
        ],
      ],
      rehypePlugins: [
        rehypeKatex,
        rehypeSlug,
        rehypeToc,
        rehypeAutolinkHeadings,
        [rehypeCustomEmoji, { emojis }],
      ],
    },
    scope: data,
  });
