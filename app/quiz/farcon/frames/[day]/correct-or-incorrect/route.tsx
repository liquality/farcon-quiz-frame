/* eslint-disable react/jsx-key */
import {
  findDayFromUrl,
  getIfCollectiveIdIsLeading,
  getQuestionFromId,
  getUserFromFid,
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

  //TODO get user from fid and check which collective they belong to, and if they are leading or not
  const user = await getUserFromFid(ctx.message.requesterFid);
  const isLeading = await getIfCollectiveIdIsLeading(user?.collective_id);
  console.log(isLeading, "what is is Leading?", user?.collective_id);

  return {
    image: <div tw="flex">That was the {imageText} Go see results.</div>,
    buttons: [
      <Button
        action="post"
        target={{
          pathname: `${questionId}/result`,
          query: { isLeading: isLeading.toString() },
        }}
      >
        See results
      </Button>,
      <Button action="link" target={`${process.env.APP_URL}/quiz/farcon`}>
        Go to Leaderboard
      </Button>,
    ],
  };
});
