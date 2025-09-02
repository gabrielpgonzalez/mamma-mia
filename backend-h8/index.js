import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const ORIGIN = process.env.FRONT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: ORIGIN, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

if (!process.env.JWT_SECRET) {
  console.warn(
    "⚠️  Falta JWT_SECRET en .env — firma de tokens no será segura."
  );
}

const users = []; // [{ id, name, email, passwordHash }]

const signToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET || "inseguro", { expiresIn: "1h" });

const requireAuth = (req, res, next) => {
  try {
    const raw = req.headers.authorization || "";
    const [, token] = raw.split(" ");
    if (!token) return res.status(401).json({ error: "No token provided" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "inseguro");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

/** ---------- Rutas API ---------- */

app.get("/api/pizzas", (_req, res) => {
  res.json([]);
});

app.get("/api/pizzas/:id", (req, res) => {
  const { id } = req.params;

  res.json({
    id,
    name: "Pizza demo",
    img: "/img/Header.jpg",
    price: 9990,
    ingredients: ["queso", "tomate"],
    desc: "Pizza de ejemplo",
  });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "name, email y password son requeridos" });
    }
    if (String(password).length < 6) {
      return res
        .status(400)
        .json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }
    const exists = users.find((u) => u.email === email);
    if (exists) return res.status(409).json({ error: "Email ya registrado" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = { id: "u_" + Date.now(), name, email, passwordHash };
    users.push(user);

    const token = signToken({ sub: user.id, email: user.email });
    return res.status(201).json({ token, email: user.email });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ error: "email y password son requeridos" });
    }
    const user = users.find((u) => u.email === email);
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });

    const token = signToken({ sub: user.id, email: user.email });
    return res.json({ token, email: user.email });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/auth/me", requireAuth, (req, res) => {
  const { email, sub } = req.user || {};
  return res.json({ id: sub, email });
});

app.post("/api/checkouts", requireAuth, (req, res) => {
  const { cart } = req.body || {};
  if (!Array.isArray(cart)) {
    return res.status(400).json({ error: "Cart inválido" });
  }

  return res.status(200).json({ ok: true });
});

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

app.listen(PORT, () => {
  console.log(`✅ API Hito 8 escuchando en http://localhost:${PORT}`);
  console.log(`   CORS origin permitido: ${ORIGIN}`);
});
