import Link from "next/link";
import { currentURL, appURL } from "../../../utils";
import { createDebugUrl } from "../../../debug";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import Navbar from "../components/Navbar";
import LeaderboardTable from "../components/LeaderboardTable";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Farcon OG Collective Quiz",
    description:
      "This is the frame quiz about Farcaster history, OGs vs new users!",
    other: {
      ...(await fetchMetadata(new URL("/quiz/farcon/frames", appURL()))),
    },
  };
}

export default async function Home() {
  const url = currentURL("/quiz/farcon");

  return (
    <div className="">
      <Navbar />
      <div className="p-5">
        Coming soon...
        {/*   <LeaderboardTable /> */}
        {/* <Link href={createDebugUrl(url)} className="underline">
        Debug
      </Link> */}
      </div>
    </div>
  );
}
