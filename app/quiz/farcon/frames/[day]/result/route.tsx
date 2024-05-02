/* eslint-disable react/jsx-key */
import { getFrameIconUrl, getFrameImageUrl } from "../../../images";
import {
  findDayFromUrl,
  getNumberOfCorrectResponsesByCollectiveId,
  getUserFromFid,
} from "../../database-operations";
import { frames } from "../../frames";
import { Button } from "frames.js/next";
import * as fs from "node:fs/promises";
import * as path from "node:path";

const montserratFont = fs.readFile(
  path.join(path.resolve(process.cwd(), "public"), "Montserrat-Regular.ttf")
);
export const POST = frames(async (ctx) => {
  const isLeading = ctx.searchParams.isLeading;

  if (!ctx.message) throw Error("No msg");
  const questionId = findDayFromUrl(ctx);
  const user = await getUserFromFid(ctx.message.requesterFid);

  const [montserratFontData] = await Promise.all([montserratFont]);
  const collectiveOneCorrectResponses =
    await getNumberOfCorrectResponsesByCollectiveId(1);
  const collectiveTwoCorrectResponses =
    await getNumberOfCorrectResponsesByCollectiveId(2);
  const collectiveThreeCorrectResponses =
    await getNumberOfCorrectResponsesByCollectiveId(3);

  const correctAnswers = [
    {
      id: 1,
      name: "OGS",
      icon: "OG_ICON",
      count: collectiveOneCorrectResponses,
    },
    {
      id: 3,
      name: "POWER USERS",
      icon: "POWER_ICON",
      count: collectiveTwoCorrectResponses,
    },
    {
      id: 2,
      name: "THE WORLD",
      icon: "NEW_ICON",
      count: collectiveThreeCorrectResponses,
    },
  ];
  if (!ctx.message) {
    throw Error("No ctx msg or q response found");
  }

  // based on searchParams, render the right image/text if leading or not
  if (isLeading === "true") {
    return {
      image: (
        <div
          tw="flex flex-col bg-violet-500 items-center justify-center text-center"
          style={{
            width: "100%",
            height: "100%",
            fontFamily: "'Montserrat'",
            backgroundImage: `url(${getFrameImageUrl(`START_${questionId}`)}`,
          }}
        >
          <div
            tw="flex flex-col bg-white border-4 border-black-500 rounded-md items-center justify-center text-center relative"
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
            <img tw="mt-10" width={50} src={getFrameIconUrl(`MEDAL_ICON`)} />

            <p tw="text-center text-[44px] uppercase">
              <b>Your TEAM IS WINNING THE FARCON HISTORY QUIZ GAME</b>
            </p>
            <div tw="flex justify-between mt--8">
              <p tw="">CORRECT ANSWERS:</p>
              {correctAnswers.map((answer, index) => (
                <div
                  key={index}
                  tw={`flex flex-col ml-10 items-center justify-center text-center mt--8 p-0 ${
                    answer.id === user?.collective_id
                      ? "border-4 border-green-500 rounded-full"
                      : ""
                  }`}
                >
                  <p tw="text-[24px] mb-1 flex flex-col items-center justify-center text-center">
                    {" "}
                    {answer.id === user?.collective_id ? (
                      <p tw={`text-[24px] text-center mt-0 mb-0`}>YOUR TEAM</p>
                    ) : null}
                    {answer.name}
                  </p>
                  <div></div>
                  <img
                    height={80}
                    width={80}
                    src={getFrameIconUrl(answer.icon)}
                    alt={`${answer.name}`}
                  />
                  <p tw="text-[24px] mt-1">{answer.count}</p>
                </div>
              ))}
            </div>
            <div tw="flex flex-row mt--12">
              <img
                tw="mt-10 mr-5"
                width={80}
                src={getFrameIconUrl(`LIQ_LOGO`)}
              />
              <p tw="text-[31px]">
                Share to get more people in. More right answers = more prizes!{" "}
              </p>
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
        <Button action="link" target={`https://warpcast.com/liquality`}>
          Follow Liquality
        </Button>,
        <Button
          action="link"
          target={`https://warpcast.com/~/compose?text=Farcon%20History%20Quiz&embeds[]=${process.env.APP_URL}/quiz/farcon/frames/${questionId}`}
        >
          SHARE
        </Button>,
      ],
    };
  } else {
    return {
      //image: getFrameImageUrl(`STATUS_LOSING_${questionId}`),

      image: (
        <div
          tw="flex flex-col bg-violet-500 items-center justify-center text-center"
          style={{
            width: "100%",
            height: "100%",
            fontFamily: "'Montserrat'",
          }}
        >
          <div
            tw="flex flex-col bg-white  border-4 border-black-500 rounded-md items-center justify-center text-center relative"
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
            <img tw="mt-10" width={50} src={getFrameIconUrl(`LOSING_ICON`)} />

            <p tw="text-center text-[44px] uppercase">
              <b>IF NOTHING CHANGES, YOUR TEAM IS LOSING THE GAME</b>
            </p>
            <div tw="flex justify-between mt--8">
              <p tw="">CORRECT ANSWERS:</p>
              {correctAnswers.map((answer, index) => (
                <div
                  key={index}
                  tw={`flex flex-col ml-10 items-center justify-center text-center mt--8 p-0 ${
                    answer.id === user?.collective_id
                      ? "border-4 border-green-500 rounded-full"
                      : ""
                  }`}
                >
                  <p tw="text-[24px] mb-1 flex flex-col items-center justify-center text-center">
                    {" "}
                    {answer.id === user?.collective_id ? (
                      <p tw={`text-[24px] text-center mt-0 mb-0`}>YOUR TEAM</p>
                    ) : null}
                    {answer.name}
                  </p>
                  <div></div>
                  <img
                    height={80}
                    width={80}
                    src={getFrameIconUrl(answer.icon)}
                    alt={`${answer.name}`}
                  />
                  <p tw="text-[24px] mt-1">{answer.count}</p>
                </div>
              ))}
            </div>
            <div tw="flex flex-row mt--12">
              <img
                tw="mt-10 mr-5"
                width={80}
                src={getFrameIconUrl(`LIQ_LOGO`)}
              />
              <p tw="text-[31px]">
                Share to get more people in. More right answers = more prizes!{" "}
              </p>
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
        <Button action="link" target={`https://warpcast.com/liquality`}>
          Follow Liquality
        </Button>,
        <Button
          action="link"
          target={`https://warpcast.com/~/compose?text=Farcon%20History%20Quiz&embeds[]=${process.env.APP_URL}/quiz/farcon/frames/${questionId}`}
        >
          SHARE
        </Button>,
      ],
    };
  }
});
