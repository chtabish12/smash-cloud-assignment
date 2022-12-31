import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import TollCalculationRoutes from "./src/routes/TollCalculationRoutes";

const app = express();
const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(TollCalculationRoutes);

app.listen(PORT, () => {
  // console.clear();
  console.log(`Server running on port ${PORT}`);
});
