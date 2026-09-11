import { NavLink } from "react-router";

export default function PageNavigation() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Lobby</NavLink>
        </li>
        <li>
          <NavLink to="/mechanics">Mechanics</NavLink>
        </li>
        <li>
          <NavLink to="/game-videopoker">Poker</NavLink>
        </li>
      </ul>
    </nav>
  );
}
