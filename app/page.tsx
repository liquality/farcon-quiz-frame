import { fetchMetadata } from "frames.js/next";
import type { Metadata } from "next";
import Link from "next/link";
import { createDebugUrl } from "./debug";
import { appURL, currentURL } from "./utils";
import Navbar from "./quiz/farcon/components/Navbar";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "frames.js starter",
    description: "This is a frames.js starter template",
    other: {
      ...(await fetchMetadata(new URL("/frames", appURL()))),
    },
  };
}

// This is a react server component only
export default async function Home() {
  const url = currentURL("/");

  // then, when done, return next frame
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="p-4 text-center bg-containerGray rounded-2xl border border-subContainerGray">
          <p className="mt-3 mb-3">Welcome to Liquality's farcon quiz!</p>
          <a href="/">
            <img
              src="https://docs.liquality.io/img/logo_dark.svg"
              width="100%"
              alt="Logo"
            />
          </a>
          <br></br>
          <a href="/quiz/farcon/frames" className="underline">
            Go to Farcon Quiz 2024 Leaderboard
          </a>
        </div>
      </div>
    </div>
  );
}
