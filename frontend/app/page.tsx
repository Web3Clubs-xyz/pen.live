import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col justify-center items-center h-screen">
      <h4 className="font-semibold text-2xl">We are Pen.Live</h4>
      <Link href="/home" className="text-blue-700">Visit Dashboard</Link>
    </section>
  );
}
