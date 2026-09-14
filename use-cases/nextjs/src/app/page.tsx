"use client";
import dynamic from "next/dynamic";
const Viewer = dynamic(() => import("./viewer"), { ssr: false });
export default function Home() {
  return (
    <main>
      <h1>Document preview</h1>
      <Viewer />
    </main>
  );
}
