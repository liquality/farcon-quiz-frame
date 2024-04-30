/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async () => {
  return {
    image: <div tw="flex">Sorry, that was the wrong response!</div>,
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
