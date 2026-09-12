import { NavLink } from "react-router";
import "./PageNavigation.css";

export default function PageNavigation() {
  return (
    <nav className="page-navigation">
      <ul>
        <li>
          <NavLink to="/">Lobby</NavLink>
        </li>
        <li>
          <NavLink to="/mechanics">Mechanics</NavLink>
        </li>
        <li>
          <NavLink to="/game-videopoker">Play</NavLink>
        </li>
      </ul>
    </nav>
  );
}
