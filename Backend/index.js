const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');

//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

dotenv.config();

//Connect to DB
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.0gv0jgu.mongodb.net/?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);


app.use(cors());
app.options('*', cors());

//Middlewares
app.use(express.json());

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);

app.listen(5000, () => console.log("Server up and running at PORT: " + 5000));
