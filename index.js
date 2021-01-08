const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

require("dotenv/config");
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true });

const user = require("./routes/userRoute");
app.use("/users", user);

const room = require("./routes/roomRoute");
app.use("/rooms", room);

const grocery = require("./routes/groceryRoute");
app.use("/groceries", grocery);

//localhost:5000/
 const server = app.listen(5000, function(){
     console.log("Server running on port 5000");
 });