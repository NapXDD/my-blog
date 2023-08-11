import { POSTS_PATH, getAllPosts, mdxSerialize } from "@/utils/mdx";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Post, PostData } from "@/component/blog/interace";
import NodeCache from "node-cache";
import PostDetail from "@/component/blog/post/post";

interface Props {
  slug: string;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  post: PostData;
}

const CONTENT_PAGE_CACHE_TIME = 60 * 60 * 24 * 7; //7 day
const cache = new NodeCache({ stdTTL: CONTENT_PAGE_CACHE_TIME });

export async function generateStaticParams() {
  let posts = cache.get<Post[]>("posts");
  if (!posts) {
    posts = getAllPosts();
    cache.set("posts", posts);
  }
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc

  return posts.map((post) => ({
    slug: post.filePath.replace(/\.mdx?$/, ""),
  }));
}

async function getData(slug: string): Promise<Props> {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);
  const mdxSource = await mdxSerialize(content, data);
  return {
    slug: slug,
    source: mdxSource,
    post: data as PostData,
  };
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const props = await getData(params.slug);
  // return <PostDetail props={props} />;
  return <PostDetail post={props.post} source={props.source} />;
}
