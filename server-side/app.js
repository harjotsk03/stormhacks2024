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

const allowedOrigins = ["http://localhost:3001", "http://localhost:3000", "https://bin-there-dumped-that.vercel.app", "https://bin-there-dumped-that-git-master-caleb05wgmailcoms-projects.vercel.app", "https://bin-there-dumped-that-gdjgzw5u7-caleb05wgmailcoms-projects.vercel.app",];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://bin-there-dumped-that.vercel.app"/);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/", bin);
app.use("/auth", auth);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
