/* eslint-disable react/jsx-key */
import { findDayFromUrl, getQuestionFromId } from "../../database-operations";
import { frames } from "../../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx) => {
  const foo = ctx.searchParams.foo;
  const questionId = findDayFromUrl(ctx);
  console.log(questionId, "what is question id? IN QQQQ");
  const question = await getQuestionFromId(questionId);
  console.log(question, "what is question?");

  let buttonMap = question?.options.map((option: string, index: number) => (
    <Button action="post" target="/">
      {option}
    </Button>
  ));
  return {
    image: (
      <div tw="flex flex-col">
        When was the farcaster github org created?{" "}
        <p>
          DAY: {questionId} {foo}
        </p>
      </div>
    ), // foo: bar

    buttons: buttonMap,
  };
});
