"use client";

import { useEffect, useState } from "react";

export default function LeaderboardTable() {
  const [userAttestations, setUserAttestations] = useState<any | null>(null); //todo fix type

  return (
    <div className="container">
      <table className="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5">
        <thead className="text-white">
          <tr className=" bg-containerGray  flex flex-col flex-no wrap sm:table-row rounded-l-lg sm:rounded-none mb-2 sm:mb-0">
            <th className="p-3 text-left">Status1</th>
            <th className="p-3 text-left table-width">Status2</th>
          </tr>
        </thead>
        <tbody className="flex-1 sm:flex-none">
          <tr className="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0">
            <td className="border-grey border  p-3">XXX</td>

            <td className="border-grey border p-3">YYY</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
