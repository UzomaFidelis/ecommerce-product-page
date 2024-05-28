import ProductImageSlider from "./ProductImageSlider";
import "../styles/scss/productPage.scss";
import { useEffect, useReducer, useCallback } from "react";
import { ProductState, ProductAction, Product } from "../types";
import LightBox from "./LightBox";

function reducer(state: ProductState, action: ProductAction): ProductState {
  switch (action.type) {
    case "increment":
      return { ...state, count: state.count + 1 };
    case "decrement":
      return { ...state, count: state.count - 1 };
    case "show-lightbox":
      return { ...state, isLightBoxOpen: true };
    case "hide-lightbox":
      return { ...state, isLightBoxOpen: false };
    default:
      return state;
  }
}

const ProductPage = ({
  product,
  addToCartFn,
}: {
  product: Product;
  addToCartFn: (product: Product, units: number) => void;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    count: 0,
    isLightBoxOpen: false,
  });

  const hideLightBox = useCallback(() => {
    dispatch({ type: "hide-lightbox" });
  }, []);

  useEffect(() => {
    const showLightBox = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        dispatch({ type: "show-lightbox" });
      }
    };

    const hideLightBoxOnResize = () => {
      if (
        state.isLightBoxOpen &&
        window.matchMedia("(max-width: 768px)").matches
      ) {
        dispatch({ type: "hide-lightbox" });
      }
    };

    // Add event listener to show lightbox

    const productGlider = document.querySelectorAll(".product-glide__slide");

    [...productGlider].forEach((img) => {
      img.addEventListener("click", showLightBox);
    });

    // Add event listener to hide lightbox on resize

    window.addEventListener("resize", hideLightBoxOnResize);

    return () => {
      [...productGlider].forEach((img) => {
        img.removeEventListener("click", showLightBox);
      });
      window.removeEventListener("resize", hideLightBoxOnResize);
    };
  });

  return (
    <main id="main" className="main-content">
      <div className="main-content__wrapper">
        {" "}
        <ProductImageSlider
          images={product.imageUrls}
          thumbnailImages={product.thumbnailImageUrls}
          selector="product"
        />
        <div className="product">
          <div>
            <p className="product__company">Sneaker Company</p>
            <p className="product__name">{product.name}</p>
            <p className="product__description">{product.description}</p>
          </div>

          <div className="pricing">
            <p className="pricing__discount">
              <span className="sr-only">discounted price</span> $
              {product.discountPrice.toFixed(2)}{" "}
              <span className="pricing__discount-rate">
                {product.discountRate}%
              </span>
            </p>
            <p className="pricing__initial">
              <span className="sr-only">original price</span> $
              {product.price.toFixed(2)}
            </p>
          </div>
          <div className="product__add-units">
            <div className="product__units">
              <button
                className="product__units-btn"
                onClick={() => dispatch({ type: "decrement" })}
                disabled={state.count === 0 ? true : false}
                aria-label="decrease number of units"
              >
                <svg
                  width="12"
                  height="4"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                      id="a"
                    />
                  </defs>
                  <use
                    fill="#FF7E1B"
                    fillRule="nonzero"
                    xlinkHref="#a"
                    className="product__units-btn-filler"
                  />
                </svg>
              </button>
              <p className="product__count"> {state.count} </p>
              <button
                className="product__units-btn"
                onClick={() => dispatch({ type: "increment" })}
                aria-label="increase number of units"
              >
                <svg
                  width="12"
                  height="12"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                      id="b"
                    />
                  </defs>
                  <use
                    fill="#FF7E1B"
                    fillRule="nonzero"
                    xlinkHref="#b"
                    className="product__units-btn-filler"
                  />
                </svg>
              </button>
            </div>
            <button
              className="add-cart-btn"
              onClick={() => addToCartFn(product, state.count)}
              disabled={state.count ? false : true}
            >
              <svg
                width="22"
                height="20"
                xmlns="http://www.w3.org/2000/svg"
                className="add-cart-btn__cart-icon"
              >
                <path
                  d="M20.925 3.641H3.863L3.61.816A.896.896 0 0 0 2.717 0H.897a.896.896 0 1 0 0 1.792h1l1.031 11.483c.073.828.52 1.726 1.291 2.336C2.83 17.385 4.099 20 6.359 20c1.875 0 3.197-1.87 2.554-3.642h4.905c-.642 1.77.677 3.642 2.555 3.642a2.72 2.72 0 0 0 2.717-2.717 2.72 2.72 0 0 0-2.717-2.717H6.365c-.681 0-1.274-.41-1.53-1.009l14.321-.842a.896.896 0 0 0 .817-.677l1.821-7.283a.897.897 0 0 0-.87-1.114ZM6.358 18.208a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm10.015 0a.926.926 0 0 1 0-1.85.926.926 0 0 1 0 1.85Zm2.021-7.243-13.8.81-.57-6.341h15.753l-1.383 5.53Z"
                  fill="#ffffff"
                  fillRule="nonzero"
                />
              </svg>
              Add to cart
            </button>
          </div>
        </div>
      </div>
      {state.isLightBoxOpen && (
        <LightBox
          images={product.imageUrls}
          thumbnailImages={product.thumbnailImageUrls}
          hideLightBox={hideLightBox}
        />
      )}
    </main>
  );
};

export default ProductPage;
