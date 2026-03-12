import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
  res.send("ok");
});

const PORT = 3333;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
