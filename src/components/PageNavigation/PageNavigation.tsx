// This page navigates through the whole web app.
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
      </ul>
    </nav>
  );
}
