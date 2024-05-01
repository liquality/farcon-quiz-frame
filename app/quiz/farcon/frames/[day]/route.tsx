/* eslint-disable react/jsx-key */
import { findDayFromUrl } from "../database-operations";
import { frames } from "../frames";
import { Button } from "frames.js/next";

const handler = frames(async (ctx) => {
  const questionId = findDayFromUrl(ctx);
  console.log(questionId, "what is Q id?");

  //Flow:
  /* 
  User responds, we check his/her FID, 
  if fid < 10,000, then he is in the OG collective
  if fid > 10,000, then he is in the new collective

  Database structure - see create.sql
  
  
  
  */
  return {
    image: (
      <div tw="flex">
        {/* <img tw="flex" src="/../../../../../server-images/CORRECT_1.jpeg" /> */}
        FARCON HISTORY QUIZ, day: {questionId}
      </div>
    ),
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
