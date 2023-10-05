export function Letter(props: { letter: string; visible: boolean }) {
  return (
    <div className="bg-gray-300 w-10 h-10 mx-1 relative flex justify-center items-center">
      <h1 className={`relative text-2xl ${props.visible ? "" : "hidden"}`}>
        {props.letter}
      </h1>
    </div>
  );
}
