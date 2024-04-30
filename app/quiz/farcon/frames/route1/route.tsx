/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx) => {
  const foo = ctx.searchParams.foo;

  return {
    image: <div tw="flex">Correct response! {foo}</div>, // foo: bar
    buttons: [
      /*    <Button action="post" target="/">
        Go back
      </Button>, */
      <Button action="link" target={`http://localhost:3001/quiz/farcon`}>
        Go to Leaderboard
      </Button>,
    ],
  };
});
