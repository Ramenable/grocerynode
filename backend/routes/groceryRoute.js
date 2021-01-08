const express = require("express");
const url = require("url");
const Grocery = require("../groceries");
const router = express.Router();

router.get("/getGroceries", (req, res) => {
	var url_parts = url.parse(req.url, true);
    Grocery.find({ roomCode: url_parts.query.room })
        .then(results => {
          res.status(200).json(results);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/addGrocery", (req, res) => {
	const grocery = new Grocery({
		name: req.body.name,
		roomCode: req.body.roomCode,
		message: req.body.message,
		requester: req.body.requester,
	});

	grocery
		.save()
		.then((data) => {
			res.status(200).json(data);
		})
		.catch((err) => {
			res.status(500).json(err);
		})
});

router.post("/deleteGrocery", (req, res) => {
	Grocery.deleteOne({ _id: req.body.id }, function (err) {
  		if (err) {
  			res.status(500).json(err);
  		} else {
  			res.status(200).json("ok");
  		}
  		// deleted at most one tank document
	});
});

module.exports = router;