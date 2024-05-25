import "../styles/scss/menu.scss";
import closeIcon from "../assets/images/icon-close.svg";
import { MenuProps } from "../types";

const Menu = ({ onClose, isOpen }: MenuProps) => {
  return (
    <nav className={`navmenu ${isOpen ? "navmenu--open" : "navmenu--closed"}`}>
      <button className="navmenu__closebtn" onClick={onClose}>
        <span className="sr-only">close menu</span>
        <img src={closeIcon} alt="menu" aria-hidden />
      </button>
      <ul className="navmenu__links">
        <li>
          <a href="" className="navmenu__link">
            Collections
          </a>
        </li>
        <li>
          <a href="" className="navmenu__link">
            Men
          </a>
        </li>
        <li>
          <a href="" className="navmenu__link">
            Women
          </a>
        </li>
        <li>
          <a href="" className="navmenu__link">
            About
          </a>
        </li>
        <li>
          <a href="" className="navmenu__link">
            Contact
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Menu;
