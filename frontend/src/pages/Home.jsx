import { useEffect, useState } from "react";
import Header from "../components/Header";
import CardPizza from "../components/CardPizza";
import { API_BASE } from "../utils/api";

const Home = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`${API_BASE}/pizzas`);
        if (!res.ok) throw new Error("No se pudieron cargar las pizzas");
        const data = await res.json();
        if (!cancelled) setPizzas(Array.isArray(data) ? data : []);
      } catch (e) {
        if (!cancelled) setError(e.message || "Error cargando pizzas");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <Header />

      <section className="py-4">
        {loading && <p className="text-center m-0">Cargando...</p>}

        {!loading && error && (
          <div className="text-center">
            <div className="alert alert-danger d-inline-block my-3">
              {error}
            </div>
          </div>
        )}

        <div className="">
          <div className="row g-4">
            {pizzas.map((p) => {
              const key = p.id ?? p._id ?? p.slug ?? p.name;
              return (
                <div className="col-12 col-sm-6 col-lg-4" key={key}>
                  <CardPizza pizza={p} />
                </div>
              );
            })}
          </div>
        </div>

        {!loading && !error && pizzas.length === 0 && (
          <div className="text-center mt-4">
            <div className="alert alert-warning d-inline-block mb-0">
              No hay pizzas para mostrar.
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Home;
