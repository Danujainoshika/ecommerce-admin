import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.routes.js";
import { sequelize } from "./models/index.js";
import { adminRouter } from "./routes/admin.routes.js";


dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/auth",authRouter);
app.use("/admin", adminRouter);



const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});