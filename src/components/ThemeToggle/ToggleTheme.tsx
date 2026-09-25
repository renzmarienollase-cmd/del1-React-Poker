import { useGlobalStore } from "../../Stores";
import "./ToggleTheme.css";

export default function ToggleTheme() {
  const { darkTheme, setDarkTheme } = useGlobalStore();

  if (darkTheme) {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
  } else if (!darkTheme) {
    document.querySelector("body")?.setAttribute("data-theme", "light");
  }

  return (
    <>
      <button
        type="button"
        data-theme={`${!darkTheme ? "light" : "dark"}`}
        id="theme-toggle"
        onClick={() => setDarkTheme()}
      >
        <span className="material-symbols-outlined">brightness_4</span>{" "}
        {`${darkTheme ? "Day" : "Night"}`}
      </button>
      <div className="bg-container">
        <img
          src="public\bg_light.svg"
          alt=""
          className={`bg-image ${!darkTheme ? "" : "hidden"}`}
        />
        <img
          src="public\bg_dark.svg"
          alt=""
          className={`bg-image ${darkTheme ? "" : "hidden"}`}
        />
      </div>
    </>
  );
}
