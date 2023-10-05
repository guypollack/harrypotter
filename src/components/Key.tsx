export function Key(props: {
  letter: string;
  onClick: () => void;
  backgroundColor: string;
}) {
  return (
    <div
      className={`${props.backgroundColor} w-20 h-20 text-2xl border-2 border-black flex relative justify-center items-center`}
      onClick={props.onClick}
    >
      {props.letter}
    </div>
  );
}
