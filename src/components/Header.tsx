import hamburgerIcon from "../assets/images/icon-menu.svg";
import userAvatar from "../assets/images/image-avatar.png";
import cartIcon from "../assets/images/icon-cart.svg";
import logo from "../assets/images/logo.svg";
import "../styles/scss/header.scss";
import { useReducer, useRef, useEffect } from "react";
import Menu from "./Menu";
import { CartItem, HeaderAction, HeaderState } from "../types";
import Cart from "./Cart";

function reducer(state: HeaderState, action: HeaderAction): HeaderState {
  switch (action.type) {
    case "show-menu":
      return { ...state, menuOpen: true };
    case "hide-menu":
      return { ...state, menuOpen: false };
    case "show-cart":
      return { ...state, cartOpen: true };
    case "hide-cart":
      return { ...state, cartOpen: false };
    default:
      return state;
  }
}

const Header = ({
  cartProducts,
  cartItemsNum,
  removeFromCartFn,
}: {
  cartProducts: CartItem[];
  cartItemsNum: number;
  removeFromCartFn: (id: string) => void;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    menuOpen: false,
    cartOpen: false,
  });
  const menuRef = useRef<HTMLDivElement>(null);

  const openNav = () => {
    dispatch({ type: "show-menu" });
    if (typeof window != "undefined" && window.document) {
      document.body.style.overflow = "hidden";
      const pageOverlay = document.getElementById("page-overlay");
      if (pageOverlay) {
        pageOverlay.style.opacity = "1";
      }
    }
  };

  const closeNav = () => {
    dispatch({ type: "hide-menu" });
    document.body.style.overflow = "unset";
    const pageOverlay = document.getElementById("page-overlay");
    if (pageOverlay) {
      pageOverlay.style.opacity = "0";
    }
  };

  useEffect(() => {
    const handleOutsideMenuClick = (e: MouseEvent) => {
      if (e.target instanceof Element) {
        if (
          state.menuOpen &&
          menuRef.current &&
          !menuRef.current.contains(e.target)
        ) {
          closeNav();
        }
      }
    };
    const closeSideMenuOnResize = () => {
      if (state.menuOpen && window.matchMedia("(min-width: 740px)").matches) {
        closeNav();
      }
    };

    document.addEventListener("mousedown", handleOutsideMenuClick);
    window.addEventListener("resize", closeSideMenuOnResize);

    return () => {
      document.removeEventListener("mousedown", handleOutsideMenuClick);
      window.removeEventListener("resize", closeSideMenuOnResize);
    };
  }, [state.menuOpen]);

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__logo-nav">
          <button className="header__menubtn" onClick={openNav}>
            <span className="sr-only">open menu</span>
            <img src={hamburgerIcon} alt="menu" aria-hidden />
          </button>
          <a href="/" className="header__logo">
            <img src={logo} alt="logo" />
          </a>
          <div ref={menuRef}>
            <Menu isOpen={state.menuOpen} onClose={closeNav} />
          </div>
        </div>

        <div className="cart-container">
          <div>
            <button
              className="header__cartbtn"
              onClick={() =>
                dispatch({ type: state.cartOpen ? "hide-cart" : "show-cart" })
              }
              aria-label={state.cartOpen ? "open cart" : "close cart"}
            >
              {cartItemsNum !== 0 && (
                <span className="cart-items-num">{cartItemsNum}</span>
              )}
              <img src={cartIcon} alt="cart" aria-hidden />
            </button>
            {state.cartOpen && (
              <Cart items={cartProducts} onRemoveCartItem={removeFromCartFn} />
            )}
          </div>

          <div>
            <img
              src={userAvatar}
              alt="user avatar"
              className="header__avatar"
            />
          </div>
        </div>
      </div>
      <div id="page-overlay"></div>
    </header>
  );
};

export default Header;
