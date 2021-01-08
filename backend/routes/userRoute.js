const express = require("express");
const User = require("../users");
const router = express.Router();

router.get("/", (req, res) => {
	// User.find()
	//   .then((data) => res.status(200).json(data))
	//   .catch((err) => res.status(500).json(err));
	User.find({})
    	.then(results => {
      	  console.log(results)
    	})
    	.catch(error => console.error(error))
});

router.post("/makeUser", async (req, res) => {
	const exists = await User.exists({ username: req.body.username, roomCode: req.body.roomCode, });  
    if (exists === false) { 
		const user = new User({
			username: req.body.username,
			roomCode: req.body.roomCode,
		});

		user
			.save()
			.then((data) => {
				res.status(200).json(data);
			})
			.catch((err) => {
				res.status(500).json(err);
			})
	} else {
		res.status(500).json("This user already exists");
	}
});

router.post("/returnUser", async (req, res) => {
	const exists = await User.exists({ username: req.body.username, roomCode: req.body.roomCode });  
    if (exists === false) {
        res.status(500).json("The user was not found");
    } else {
        res.status(200).json("Ok");
    }
});

router.delete("/:userId", (req, res) => {
	User.remove({ _id: req.params.userId })
		.then((data) => res.status(200).json(data))
		.catch((err) => {
			res.status(500).json(err);
		});
});

module.exports = router;