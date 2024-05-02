/* eslint-disable react/jsx-key */
import { findDayFromUrl } from "../database-operations";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { getFrameIconUrl, getFrameImageUrl } from "../../images";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const montserratFont = fs.readFile(
  path.join(path.resolve(process.cwd(), "public"), "Montserrat-Regular.ttf")
);

// const montserratFont = fetch(
//   new URL("/public/Inter-Bold.ttf", process.env.NEXT_PUBLIC_HOST)
// ).then((res) => res.arrayBuffer());

const handler = frames(async (ctx) => {
  const questionId = findDayFromUrl(ctx);
  console.log(questionId, "what is Q id?", path.join(path.resolve(process.cwd(), "public")));

  const [montserratFontData] = await Promise.all([montserratFont]);
  console.log(montserratFontData, "what is hej?");

  //Flow:
  /* 
  User responds, we check his/her FID, 
  if fid < 10,000, then he is in the OG collective
  if fid > 10,000, then he is in the new collective

  Database structure - see create.sql
  
  */

  return {
    //image: getFrameImageUrl(`START_${questionId}`),

    image: (
      <div
      
        tw="flex flex-col bg-violet-500 items-center justify-center text-center"
        style={{ width: "100%", height: "100%",  fontFamily: "'Montserrat'", }}
      >
        <div
          tw="flex flex-col bg-white items-center justify-center text-center relative"
          style={{ width: "95%", height: "90%" }}
        >
          <p
            style={{
              position: "absolute",
              right: 30,
              top: 0,
            }}
          >
            <b>FARCON QUIZ</b>
          </p>
          <img width={50} src={getFrameIconUrl(`MEDAL_ICON`)} />

          <p tw="text-center text-[44px] uppercase">
            <b>Your TEAM IS WINNING THE FARCON HISTORY QUIZ GAME</b>
          </p>
          <div tw="flex justify-between">
            <p tw="">CORRECT ANSWERS:</p>
            <div tw="flex flex-col">
              <p tw="text-xs mb--3">OGS</p>
              <img width={50} src={getFrameIconUrl(`OG_ICON`)} />
            </div>
          </div>
        </div>
      </div>
    ),
    imageOptions: {
      fonts: [
        {
          name: "Montserrat",
          data: montserratFontData,
        },
      ],
    },
    buttons: [
      // With query params
      <Button
        action="post"
        target={{ pathname: `${questionId}/question`, query: { foo: "bar" } }}
      >
        PLAY NOW
      </Button>,
    ],
    headers: {
      // Max cache age in seconds
      "Cache-Control": "max-age=0",
    },
  };
});

export const GET = handler;
export const POST = handler;
