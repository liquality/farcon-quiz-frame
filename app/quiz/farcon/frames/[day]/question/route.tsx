/* eslint-disable react/jsx-key */
import {
  findDayFromUrl,
  getQuestionFromId,
  saveUser,
} from "../../database-operations";
import { frames } from "../../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx) => {
  const foo = ctx.searchParams.foo;
  const questionId = findDayFromUrl(ctx);
  const question = await getQuestionFromId(questionId);

  console.log(ctx, "what is ctx??");
  if (!ctx.message) {
    throw new Error("Could not find CTX data!");
  }
  const user = await saveUser(ctx.message.requesterFid);

  //If question has expired, render expired frame
  if (!question) {
    return {
      image: (
        <div tw="flex flex-col">
          This day has expired! Please participate in next one
          <p>
            DAY: {questionId} {foo}
          </p>
        </div>
      ),

      buttons: [
        <Button action="link" target={`http://localhost:3001/quiz/farcon`}>
          Go to Leaderboard
        </Button>,
        <Button action="link" target={`https://warpcast.com/liquality`}>
          Follow Liquality
        </Button>,
      ],
    };
  } else {
    //Else render question frame with response options
    let buttonOptions = question.options.map(
      (option: string, index: number) => (
        <Button
          action="post"
          target={{
            pathname: `${questionId}/correct-or-incorrect`,
            query: { response: option },
          }}
        >
          {option}
        </Button>
      )
    );
    return {
      image: (
        <div tw="flex flex-col">
          When was the farcaster github org created?{" "}
          <p>
            DAY: {questionId} {foo}
          </p>
        </div>
      ),
      buttons: buttonOptions,
    };
  }
});
