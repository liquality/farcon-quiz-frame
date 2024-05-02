/* eslint-disable react/jsx-key */
import { findDayFromUrl } from "../database-operations";
import { frames } from "../frames";
import { Button } from "frames.js/next";
import { getFrameIconUrl, getFrameImageUrl } from "../../images";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const montserratFont = fs.readFile(
  path.join(path.resolve(process.cwd(), "public"), "montserrat.ttf")
);

const handler = frames(async (ctx) => {
  const questionId = findDayFromUrl(ctx);
  console.log(questionId, "what is Q id?");
  const [font] = await Promise.all([montserratFont]);
  console.log(font, "what is hej?");

  //Flow:
  /* 
  User responds, we check his/her FID, 
  if fid < 10,000, then he is in the OG collective
  if fid > 10,000, then he is in the new collective

  Database structure - see create.sql
  
  */

  const correctAnswers = [
    { name: "OGS", icon: "OG_ICON", count: 100 },
    { name: "POWER BADGE USERS", icon: "POWER_ICON", count: 50 },
    { name: "NEW USERS", icon: "NEW_ICON", count: 75 },

    // Add more objects as needed
  ];

  return {
    //image: getFrameImageUrl(`START_${questionId}`),

    image: (
      <div
        tw="flex flex-col bg-violet-500 items-center justify-center text-center"
        style={{ width: "100%", height: "100%" }}
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
            {correctAnswers.map((answer, index) => (
              <div
                key={index}
                tw="flex flex-col ml-10 items-center justify-center text-center"
              >
                <p tw="text-[24px] ">{answer.name}</p>
                <img
                  height={80}
                  width={80}
                  src={getFrameIconUrl(answer.icon)}
                  alt={`${answer.name}`}
                />
                <p tw="text-[24px]">{answer.count}</p>
              </div>
            ))}
          </div>
          <div tw="flex flex-row">
            <img tw="mt-10 mr-5" width={80} src={getFrameIconUrl(`LIQ_LOGO`)} />
            <p tw="text-[31px]">
              Share to get more people in. More right answers = more prizes!{" "}
            </p>
          </div>
        </div>
      </div>
    ),
    /*     imageOptions: {
      fonts: [
        {
          name: "Montserrat",
          data: font,
        },
      ],
    }, */
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
