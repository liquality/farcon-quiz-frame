/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const handler = frames(async () => {
  return {
    image: <div tw="flex">What is @dwr's last name?</div>,
    buttons: [
      // With query params
      <Button
        action="post"
        target={{ pathname: "/route1", query: { foo: "bar" } }}
      >
        Romero
      </Button>,
      // Without query params
      <Button action="post" target="/route2">
        Romeo
      </Button>,
    ],
  };
});

export const GET = handler;
export const POST = handler;
