import { createFrames } from "frames.js/next";
import { appURL } from "../../../utils";

export const frames = createFrames({
  basePath: "/quiz/farcon/frames/",
  baseUrl: appURL(),
});
