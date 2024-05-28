import Glide from "@glidejs/glide";
import { useEffect } from "react";
import "../styles/scss/productImageSlider.scss";

const ProductImageSlider = ({
  images,
  thumbnailImages,
  selector,
}: {
  images: string[];
  thumbnailImages: string[];
  selector: string;
}) => {
  useEffect(() => {
    const slider = new Glide(`.${selector}-glide`, {
      type: "carousel",
      gap: 0,
      perView: 1,
    });
    slider.mount();
    return () => {
      slider.destroy();
    };
  }, [selector]);

  return (
    <div className={`${selector}-glide`} id="glide">
      <div className={`${selector}-glide__track-wrapper`}>
        {" "}
        <div
          className={`glide__track ${selector}-glide__track`}
          data-glide-el="track"
        >
          <ul className={`glide__slides ${selector}-glide__slides`}>
            {images.map((img, idx) => (
              <li key={idx} className={`glide__slide ${selector}-glide__slide`}>
                <img
                  src={img}
                  alt={`product view ${idx + 1}`}
                  className="slider__img"
                />
              </li>
            ))}
          </ul>
        </div>
        <div data-glide-el="controls" className={`${selector}-glider-control`}>
          <button
            data-glide-dir="<"
            className={`${selector}-glider-control__btn`}
            aria-label="Previous"
          >
            <svg
              width="12"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M11 1 3 9l8 8"
                stroke="#1D2026"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>
          <button
            data-glide-dir=">"
            className={`${selector}-glider-control__btn`}
            aria-label="Next"
          >
            <svg
              width="13"
              height="18"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="m2 1 8 8-8 8"
                stroke="#1D2026"
                strokeWidth="3"
                fill="none"
                fillRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`glide__bullets ${selector}-glide__bullets`}
        data-glide-el="controls[nav]"
      >
        {thumbnailImages.map((img, idx) => (
          <button
            key={idx}
            className={`glide__bullet ${selector}-glide__bullet`}
            data-glide-dir={`=${idx}`}
            aria-label={`show product image ${idx + 1}`}
          >
            <img src={img} alt="" className="glide__bullet-img" aria-hidden />
            <span className="glide__bullet-overlay"></span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImageSlider;
