const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3005;
const cors = require("cors");
const bin = require("./routes/bin");
const auth = require("./routes/auth");

dotenv.config();
const app = express();
app.use(cookieParser());

app.use(express.json());

app.use(
  cors({
    origin: "*", // Allow all origins
    credentials: true, // This is necessary for cookies to be sent
  })
);


mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/", bin);
app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
