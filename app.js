require("dotenv").config();

const express = require("express");
const app = express();
const port =  process.env.PORT || 8000;
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./Server/models/registration");
const cookieParser = require("cookie-parser");
const path = require("path");



const authRoute = require("./Server/Routes/auth");
const marketTra = require("./Server/Routes/mak")
const aucte = require("./Server/Routes/Auct")

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update with your specific origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(
  cors({
    origin: ["http://energy-app-7-env.eba-mr4i5q5z.ap-south-1.elasticbeanstalk.com"],
    method: ["GET", "POST" ,"PUT" , "DELETE"],
    credentials: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"], 
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

/// USER ROUTES

app.use('/api/auth',authRoute)
app.use("/api/mak",marketTra)
app.use("/api/auct",aucte)


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});



console.log(process.env.MONGO_URL)
// console.log("")

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("connection successfull");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log("server is running on port" + " " + port);
});
