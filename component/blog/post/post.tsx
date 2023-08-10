import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { PostData } from "../interace";

interface Props {
  post: PostData;
  source: MDXRemoteSerializeResult<Record<string, unknown>>;
}

export default function Post(props: Props) {
  return <>{props.post.title}</>;
}
