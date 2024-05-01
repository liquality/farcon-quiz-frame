export const imageMap: Record <string, string> = {
  "CORRECT_1": "https://i.ibb.co/MB15MvX/CORRECT-1.png",
  "NOT_CORRECT_1": "https://i.ibb.co/rdGwQbm/NOT-CORRECT-1.png",
  "QUESTION_1": "https://i.ibb.co/CWHSh4X/QUESTION-1.png",
  "START_1": "https://i.ibb.co/fGfPnWs/START-1.png",
  "STATUS_LOSING_1": "https://i.ibb.co/Y0gpXTM/STATUS-LOSING-1.png",
  "STATUS_WINNING_1": "https://i.ibb.co/c1dZZCH/STATUS-WINNING-1.png",

  "CORRECT_2": "https://i.ibb.co/JCPBmDm/CORRECT-2.png",
  "NOT_CORRECT_2": "https://i.ibb.co/5jRgfzJ/NOT-CORRECT-2.png",
  "QUESTION_2": "https://i.ibb.co/fS7gwSD/QUESTION-2.png",
  "START_2": "https://i.ibb.co/WndP3Ss/START-2.png",
  "STATUS_LOSING_2": "https://i.ibb.co/Z2Bw9SG/STATUS-LOSING-2.png",
  "STATUS_WINNING_2": "https://i.ibb.co/HqN2YBJ/STATUS-WINNING-2.png",

  "CORRECT_3": "https://i.ibb.co/YTg71W4/CORRECT-3.png",
  "NOT_CORRECT_3": "https://i.ibb.co/8YFpYjy/NOT-CORRECT-3.png",
  "QUESTION_3": "https://i.ibb.co/3M8vC3X/QUESTION-3.png",
  "START_3": "https://i.ibb.co/KK37Mqj/START-3.png",
  "STATUS_LOSING_3": "https://i.ibb.co/qpVvKF3/STATUS-LOSING-3.png",
  "STATUS_WINNING_3": "https://i.ibb.co/KhSp5GH/STATUS-WINNING-3.png",
};




export const getFrameImageUrl = (key: string) => {
    return `${process.env.NEXT_PUBLIC_HOST}/frame-images/${key}.png`;
  }