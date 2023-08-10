import Link from "next/link";
import { Post } from "../interace";

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
            href="/blog/[slug]"
            as={`/blog/${post.filePath.replace(/\.mdx?$/, "")}`}
          >
            {post.data.title}
          </Link>
        ))}
      </div>
    </>
  );
}
