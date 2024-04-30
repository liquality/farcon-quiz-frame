import { fetchMetadata } from "frames.js/next";
import type { Metadata } from "next";
import Link from "next/link";
import { createDebugUrl } from "./debug";
import { appURL, currentURL } from "./utils";

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
    <div className="p-4">
      Welcome to Liquality's farcon quiz! <br></br>
      <Link href="/quiz/farcon" className="underline">
        Go to Farcon Quiz 2024 Leaderboard
      </Link>
    </div>
  );
}
