const express = require("express");
const app = express();
const mongoose = require("mongoose");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

require("dotenv/config");
mongoose.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
	.then(() => console.log("Database Connected Successfully"))
    .catch(err => console.log(err));

const user = require("./routes/userRoute");
app.use("/users", user);

const room = require("./routes/roomRoute");
app.use("/rooms", room);

const grocery = require("./routes/groceryRoute");
app.use("/groceries", grocery);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static("build"));
    app.get("*", (req, res) => {
       res.sendFile(path.resolve(__dirname,  "build", "index.html"));
  });
}

app.listen(process.env.PORT || 5000);

