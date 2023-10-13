const keyboardRowLetters = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Z", "X", "C", "V", "B", "N", "M"],
];

const MAX_ROW_LENGTH = Math.max(...keyboardRowLetters.map((row) => row.length));
const KEY_WIDTH_PERCENTAGE = 8;
const keyHeightPercentage = KEY_WIDTH_PERCENTAGE / 2;

export function GrowingBoxesContainer() {
  // console.log("ROW LENGTH:", maxRowLength);
  return (
    // <div
    //   className={`w-7/12 flex items-center absolute bottom-0 bg-blue-300`}
    // >
    //   {keyboardRowLetters[0].map((key) => (
    //     <div
    // className={`w-[${
    //   100 / keyboardRowLetters[0].length
    // }%] mx-1 flex items-center relative top-0`}
    //     >
    //       <div
    //         className={`w-full h-0 py-[100%] my-2 border border-black relative flex justify-center items-center`}
    //       >
    //         {key}
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="w-6/12 border border-black flex flex-col items-center">
      {keyboardRowLetters.map((row) => (
        <div className="w-full flex justify-center my-0.5 border border-green-400">
          {row.map((key) => (
            <div
              className={`w-[${KEY_WIDTH_PERCENTAGE}%] py-[${keyHeightPercentage}%] mx-0.5 flex justify-center items-center border border-blue-300`}
            >
              <div className="h-full text-2xl">{key}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
