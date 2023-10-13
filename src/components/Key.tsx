export function Key(props: {
  letter: string;
  onClick: () => void;
  backgroundColor: string;
}) {
  return (
    <div
      className={`${props.backgroundColor} text-black rounded-md w-8 h-16 text-2xl m-0.5 border-2 border-black flex relative justify-center items-center`}
      id={`keyboard-Key${props.letter}`}
      onClick={props.onClick}
    >
      {props.letter}
    </div>
  );
}
