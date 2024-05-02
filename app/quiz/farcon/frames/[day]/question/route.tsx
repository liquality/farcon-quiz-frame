/* eslint-disable react/jsx-key */
import { getFrameImageUrl } from "../../../images";
import {
  findDayFromUrl,
  getQuestionFromId,
  getUserQuestionResponseFromUserId,
  saveUser,
} from "../../database-operations";
import { frames } from "../../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx) => {
  const foo = ctx.searchParams.foo;
  const questionId = findDayFromUrl(ctx);
  const question = await getQuestionFromId(questionId);

  if (!ctx.message) {
    throw new Error("Could not find CTX data!");
  }
  const user = await saveUser(ctx.message.requesterFid);
  const hasAlreadyResponded = await getUserQuestionResponseFromUserId(user?.id);
  console.log(hasAlreadyResponded, "HAS ALREADY RESPONDED");

  //If question has expired, render expired frame
  if (!question) {
    return {
      image: getFrameImageUrl("EXPIRED_QUESTION"),

      buttons: [
        <Button
          action="link"
          target={`https://warpcast.com/~/compose?text=Farcon%20History%20Quiz&embeds[]=${process.env.APP_URL}/quiz/farcon/frames/${questionId}`}
        >
          SHARE
        </Button>,
        <Button action="link" target={`https://warpcast.com/liquality`}>
          Follow Liquality
        </Button>,
      ],
    };
  } else if (hasAlreadyResponded?.id) {
    return {
      image: getFrameImageUrl("ALREADY_SUBMITTED"),
      buttons: [
        <Button
          action="link"
          target={`https://warpcast.com/~/compose?text=Farcon%20History%20Quiz&embeds[]=${process.env.APP_URL}/quiz/farcon/frames/${questionId}`}
        >
          SHARE
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
      image: getFrameImageUrl(`QUESTION_${questionId}`),
      buttons: buttonOptions,
    };
  }
});
