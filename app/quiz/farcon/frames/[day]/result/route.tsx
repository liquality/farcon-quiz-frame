/* eslint-disable react/jsx-key */
import { getFrameImageUrl } from "../../../images";
import { findDayFromUrl } from "../../database-operations";
import { frames } from "../../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx) => {
  const isLeading = ctx.searchParams.isLeading;

  const questionId = findDayFromUrl(ctx);

  if (!ctx.message) {
    throw Error("No ctx msg or q response found");
  }

  // based on searchParams, render the right image/text if leading or not
  if (isLeading === "true") {
    return {
      image: getFrameImageUrl(`STATUS_WINING_${questionId}`),
      buttons: [
        <Button action="link" target={`https://warpcast.com/liquality`}>
          Follow Liquality
        </Button>,
        <Button action="link" target={`${process.env.APP_URL}/quiz/farcon`}>
          Go to Leaderboard
        </Button>,
      ],
    };
  } else {
    return {
      image: getFrameImageUrl(`STATUS_LOSING_${questionId}`),
      buttons: [
        <Button action="link" target={`https://warpcast.com/liquality`}>
          Follow Liquality
        </Button>,
        <Button action="link" target={`${process.env.APP_URL}/quiz/farcon`}>
          Go to Leaderboard
        </Button>,
      ],
    };
  }
});
