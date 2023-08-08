import Link from "next/link";
import NodeCache from "node-cache";


export default function Home() {
  return (
    <>
      <Link href={"/BlogList"}>Blog link</Link>;
    </>
  );
}
