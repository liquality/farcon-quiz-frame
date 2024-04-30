/* eslint-disable react/jsx-key */
import { frames } from "./frames";
import { Button } from "frames.js/next";

const handler = frames(async () => {
  //Flow:
  /* 
  User responds, we check his/her FID, 
  if fid < 10,000, then he is in the OG collective
  if fid > 10,000, then he is in the new collective

  Database structure - see create.sql
  
  
  
  */
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
