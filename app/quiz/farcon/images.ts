

export const getFrameImageUrl = (key: string) => {
    return `${process.env.NEXT_PUBLIC_HOST}/frame-images/${key}.png`;
  }