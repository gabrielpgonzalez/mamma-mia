import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";

const CartContext = createContext();

const initialState = {
  items: [], // { id, name, img, price, qty }
};

function cartReducer(state, action) {
  switch (action.type) {
    case "INIT_FROM_STORAGE": {
      return action.payload ?? state;
    }
    case "ADD_ITEM": {
      const item = action.payload;
      const exists = state.items.find((i) => i.id === item.id);
      const items = exists
        ? state.items.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          )
        : [...state.items, { ...item, qty: 1 }];
      return { ...state, items };
    }
    case "REMOVE_ONE": {
      const id = action.payload;
      const items = state.items
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
      return { ...state, items };
    }
    case "REMOVE_ALL": {
      const id = action.payload;
      return { ...state, items: state.items.filter((i) => i.id !== id) };
    }
    case "CLEAR": {
      return { ...state, items: [] };
    }
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved)
      dispatch({ type: "INIT_FROM_STORAGE", payload: JSON.parse(saved) });
  }, []);
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state));
  }, [state]);

  const total = useMemo(
    () => state.items.reduce((acc, i) => acc + i.price * i.qty, 0),
    [state.items]
  );
  const count = useMemo(
    () => state.items.reduce((acc, i) => acc + i.qty, 0),
    [state.items]
  );

  const value = useMemo(
    () => ({
      items: state.items,
      total,
      count,
      addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
      removeOne: (id) => dispatch({ type: "REMOVE_ONE", payload: id }),
      removeAll: (id) => dispatch({ type: "REMOVE_ALL", payload: id }),
      clear: () => dispatch({ type: "CLEAR" }),
    }),
    [state.items, total, count]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCartContext must be used within CartProvider");
  return ctx;
}
