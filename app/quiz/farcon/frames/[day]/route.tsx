/* eslint-disable react/jsx-key */
import { findDayFromUrl } from "../database-operations";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { getFrameImageUrl } from "../../images";

const handler = frames(async (ctx) => {
  const questionId = findDayFromUrl(ctx);
  console.log(questionId, "what is Q id?");
  const imageSrc = getFrameImageUrl(`START_${questionId}`);
  //Flow:
  /* 
  User responds, we check his/her FID, 
  if fid < 10,000, then he is in the OG collective
  if fid > 10,000, then he is in the new collective

  Database structure - see create.sql
  
  */

  return {
    image: imageSrc,

    buttons: [
      // With query params
      <Button
        action="post"
        target={{ pathname: `${questionId}/question`, query: { foo: "bar" } }}
      >
        PLAY
      </Button>,
    ],
  };
});

export const GET = handler;
export const POST = handler;
