"use client";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="text-center">
        <Image
          src="/logo.png"
          alt="CareerBuild Logo"
          width={300}
          height={80}
          priority
          className="mb-6 mx-auto"
        />
      </div>
    </div>
  );
}
