import express from "express";
import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import protectedUser from "./routers/protectedRoutes.js";
import blogs from "./routers/blogRoutes.js";
import services from "./routers/servicesRoute.js";
import gallery from "./routers/galleryRoutes.js";
import layout from "./routers/layoutRoute.js";
import subscribe from "./routers/subscriptionRoute.js";
import contact from "./routers/contactRoute.js";
import order from "./routers/orderRoutes.js";

// Dotenv Config
dotenv.config();

// DataBase Config
connectDB();

// Middlewares
const app = express();
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

// Rest API's
app.use("/api/v1/user", protectedUser);
app.use("/api/v1/blog", blogs);
app.use("/api/v1/service", services);
app.use("/api/v1/gallery", gallery);
app.use("/api/v1/layout", layout);
app.use("/api/v1/subscribe", subscribe);
app.use("/api/v1/contact", contact);
app.use("/api/v1/order", order);

app.use("/", (req, res) => {
  res.send(`<h1>Server is running successfully!</h1>`);
});

// Listen

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is runnning at PORT ${PORT}`.bgMagenta.white);
});
