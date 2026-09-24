import "./ToggleTheme.css";

export default function ToggleTheme() {
  return (
    <button type="button" data-theme="dark" id="theme-toggle">
      <span className="material-symbols-outlined">brightness_4</span> Night
    </button>
  );
}
