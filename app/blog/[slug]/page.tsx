import {
  POSTS_PATH,
  getAllPosts,
  mdxSerialize,
  postFilePaths,
} from "@/utils/mdx";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Post, PostData } from "@/component/blog/interace";
import { useRouter } from "next/router";
import NodeCache from "node-cache";

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

async function getData(slug: string) {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);
  const { content, data } = matter(source);
  const mdxSource = mdxSerialize(content, data);
  return {
    revalidate: CONTENT_PAGE_CACHE_TIME,
    props: {
      slug: slug,
      source: mdxSource,
      post: data,
    },
  };
}

export default function PostDetail() {
  const router = useRouter();
  const props = getData(router.query.slug as string);
  return <>{/* <Post post={props.} source={props.source} /> */}</>;
}

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   if (params === undefined) {
//     return { notFound: true };
//   }

//   const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
//   const source = fs.readFileSync(postFilePath);

//   const { content, data } = matter(source);
//   const mdxSource = mdxSerialize(content, data);

//   return {
//     revalidate: CONTENT_PAGE_CACHE_TIME,
//     props: {
//       slug: params.slug,
//       source: mdxSource,
//       post: data,
//     },
//   };
// };

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = postFilePaths
//     .map((path) => path.replace(/\.mdx?$/, ""))
//     .map((slug) => ({ params: { slug } }));

//   return {
//     paths,
//     fallback: "blocking",
//   };
// };
