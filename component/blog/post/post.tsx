"use client";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostData } from "../interace";

interface Props {
  post: PostData;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}

export default function PostDetail(props: Props) {
  return <>{<MDXRemote {...props.source} />}</>;
}
