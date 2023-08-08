import { POSTS_PATH, mdxSerialize, postFilePaths } from "@/utils/mdx";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { PostData } from "@/component/blog/interace";

interface Props {
  slug: string;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
  post: PostData;
}

const CONTENT_PAGE_CACHE_TIME = 60 * 60 * 24 * 7; //7 day

export default function Post(props: Props) {
  return (
    <>
      <div>{props.slug}</div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (params === undefined) {
    return { notFound: true };
  }

  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);
  const mdxSource = mdxSerialize(content, data);

  return {
    revalidate: CONTENT_PAGE_CACHE_TIME,
    props: {
      slug: params.slug,
      source: mdxSource,
      post: data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postFilePaths
    .map((path) => path.replace(/\.mdx?$/, ""))
    .map((slug) => ({ params: { slug } }));

  console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
};
