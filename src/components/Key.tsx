export function Key(props: {
  letter: string;
  onClick: () => void;
  backgroundColor: string;
}) {
  return (
    <div
      className={`${props.backgroundColor} w-10 h-20 text-2xl m-1 border-2 border-black flex relative justify-center items-center`}
      id={`keyboard-Key${props.letter}`}
      onClick={props.onClick}
    >
      {props.letter}
    </div>
  );
}
