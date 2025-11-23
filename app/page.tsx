"use client"
import Link from "next/link";

export default function Home() {
 
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Link href={"/login"} className="px-10 py-2 rounded-sm bg-emerald-200 text-gray-950" >se connecter</Link>
    </div>
  );
}
