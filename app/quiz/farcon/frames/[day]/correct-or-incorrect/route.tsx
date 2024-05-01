/* eslint-disable react/jsx-key */
import {
  findDayFromUrl,
  getQuestionFromId,
  saveUserQuestionResponse,
} from "../../database-operations";
import { frames } from "../../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx) => {
  const response = ctx.searchParams.response;

  const questionId = findDayFromUrl(ctx);
  const question = await getQuestionFromId(questionId);

  const correctResponse = question?.correct_response === response;
  //TODO save response in user_question_responses
  if (!ctx.message || !response) {
    throw Error("No ctx msg or q response found");
  }
  await saveUserQuestionResponse(
    questionId,
    ctx.message?.requesterFid,
    response,
    correctResponse
  );
  const imageText = correctResponse ? "correct response!" : "wrong response!";

  return {
    image: <div tw="flex">That was the {imageText} Go see leaderboard.</div>,
    buttons: [
      /*   <Button
        action="post"
        target={{ pathname: "/route1", query: { foo: "baz" } }}
      >
        Go to route 1
      </Button>, */
      <Button action="link" target={`http://localhost:3001/quiz/farcon`}>
        Go to Leaderboard
      </Button>,
    ],
  };
});
