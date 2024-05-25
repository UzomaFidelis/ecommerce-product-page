import ProductImageSlider from "./ProductImageSlider";
import "../styles/scss/lightBox.scss";
import { useRef } from "react";

const LightBox = ({
  images,
  thumbnailImages,
  hideLightBox,
}: {
  images: string[];
  thumbnailImages: string[];
  hideLightBox: () => void;
}) => {
  const lightBoxRef = useRef<HTMLDivElement>(null);
  return (
    <div className="lightbox" id="light-box" ref={lightBoxRef}>
      <div className="lightbox__close">
        <button
          className="lightbox__close-btn"
          aria-label="close product image viewer"
          onClick={hideLightBox}
        >
          {" "}
          <svg
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="lightbox__close-btn-img"
          >
            <path
              d="m11.596.782 2.122 2.122L9.12 7.499l4.597 4.597-2.122 2.122L7 9.62l-4.595 4.597-2.122-2.122L4.878 7.5.282 2.904 2.404.782l4.595 4.596L11.596.782Z"
              fill="#fff"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <ProductImageSlider
        images={images}
        thumbnailImages={thumbnailImages}
        selector="lightbox"
      />
    </div>
  );
};

export default LightBox;
