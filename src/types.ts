export type ProductState = {
  count: number;
  isLightBoxOpen: boolean;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountRate: number;
  discountPrice: number;
  imageUrls: string[];
  thumbnailImageUrls: string[];
};

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  units: number;
  image: string;
};

export type ProductAction =
  | {
      type: "increment";
    }
  | {
      type: "decrement";
    }
  | {
      type: "show-lightbox";
    }
  | {
      type: "hide-lightbox";
    };

export type AppState = {
  cartItems: CartItem[];
};

export type AppAction =
  | {
      type: "add-to-cart";
      payload: { product: Product; units: number };
    }
  | {
      type: "remove-from-cart";
      payload: { id: string };
    };

export type HeaderState = {
  menuOpen: boolean;
  cartOpen: boolean;
};

export type HeaderAction =
  | {
      type: "show-menu";
    }
  | {
      type: "hide-menu";
    }
  | {
      type: "show-cart";
    }
  | {
      type: "hide-cart";
    };

export type MenuProps = {
  isOpen: boolean;
  onClose: () => void;
};
