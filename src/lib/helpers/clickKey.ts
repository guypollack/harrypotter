export function clickKey(code: string) {
  console.log(code);
  try {
    const key = document.querySelector(`#keyboard-${code}`);
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      button: 0,
    });
    if (key) {
      key.dispatchEvent(clickEvent);
    }
  } catch (error) {}
  return "";
}
