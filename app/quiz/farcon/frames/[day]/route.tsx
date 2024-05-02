/* eslint-disable react/jsx-key */
import { findDayFromUrl } from "../database-operations";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { getFrameIconUrl, getFrameImageUrl } from "../../images";

const handler = frames(async (ctx) => {
  const questionId = findDayFromUrl(ctx);

  return {
    image: getFrameImageUrl(`START_${questionId}`),

    buttons: [
      // With query params
      <Button
        action="post"
        target={{ pathname: `${questionId}/question`, query: { foo: "bar" } }}
      >
        PLAY NOW
      </Button>,
      /*    <Button
        action="post"
        target={{
          pathname: `${questionId}/result`,
          query: { isLeading: false },
        }}
      >
        TEAM RESULTS
      </Button>, */
    ],
    headers: {
      // Max cache age in seconds
      "Cache-Control": "max-age=0",
    },
  };
});

export const GET = handler;
export const POST = handler;
