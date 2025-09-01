import { createContext, useContext, useEffect, useState } from "react";

const PizzasContext = createContext();

export function PizzasProvider({ children }) {
  const [pizzas, setPizzas] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const resp = await fetch("http://localhost:5001/api/pizzas");
        if (!resp.ok) throw new Error("Error al cargar pizzas");
        const data = await resp.json();
        setPizzas(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <PizzasContext.Provider value={{ pizzas, loading, error }}>
      {children}
    </PizzasContext.Provider>
  );
}

export const usePizzas = () => {
  const ctx = useContext(PizzasContext);
  if (!ctx) throw new Error("usePizzas must be used within PizzasProvider");
  return ctx;
};
