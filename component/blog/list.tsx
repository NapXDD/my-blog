import Link from "next/link";
import { Post } from "./interace";

interface Props {
  posts: Post[];
}

export default function BlogList(props: Props): JSX.Element {
  return (
    <>
      <div>
        {props.posts.map((post, index) => (
          <Link
            key={index}
            href="/Post/[slug]"
            as={`/Post/${post.filePath.replace(/\.mdx?$/, "")}`}
          >
            {post.data.title}
          </Link>
        ))}
      </div>
    </>
  );
}
