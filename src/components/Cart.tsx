import "../styles/scss/cart.scss";
import { CartItem } from "../types";
import deleteIcon from "../assets/images/icon-delete.svg";

const Cart = ({
  items,
  onRemoveCartItem,
}: {
  items: CartItem[];
  onRemoveCartItem: (id: string) => void;
}) => {
  return (
    <section className="cart">
      <p className="cart__label">Cart</p>
      <hr className="cart__divider" />
      <div className="cart__content">
        {items.length !== 0 ? (
          <ul className="cart__items">
            {items.map((item, idx) => (
              <li key={idx} className="cart__item">
                <div className="cart__image-container">
                  <img
                    src={item.image}
                    alt=""
                    className="cart__image"
                    aria-hidden
                  />
                </div>
                <div className="cart__item-info">
                  <p className="cart__item-name">{item.name}</p>
                  <p className="cart__item-price">
                    ${item.price.toFixed(2)} x {item.units}{" "}
                    <span className="cart__item_price cart__item-price_total">
                      ${(item.price * item.units).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="cart__delete">
                  <button
                    aria-label="remove from cart"
                    className="cart__delete-btn"
                    onClick={() => onRemoveCartItem(item.productId)}
                  >
                    <img
                      src={deleteIcon}
                      alt=""
                      aria-hidden
                      className="cart__delete-btn-image"
                    />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="cart__empty">Your cart is empty</p>
        )}
      </div>
    </section>
  );
};

export default Cart;
