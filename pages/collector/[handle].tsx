import Link from "next/link";

export default function ProfilePage() {
  return (
    <>
      <div>... I will do anything</div>
      <Link href={"/admin"}>
        <a> Admin Panel </a>
      </Link>
    </>
  );
}
