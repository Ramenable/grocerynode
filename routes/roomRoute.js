const express = require("express");
const url = require("url");
const Room = require("../rooms");
const router = express.Router();

router.get("/getRoom", (req, res) => {
    var url_parts = url.parse(req.url, true);
    Room.find({ roomCode: url_parts.query.room })
        .then(results => {
          res.status(200).json(results);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.post("/addRoom", async(req, res) => {
    const exists = await Room.exists({ roomCode: req.body.roomCode });  
    if (exists === true) {
        res.status(500).json("The room already exists");
    } else {
        const room = new Room({
            roomCode: req.body.roomCode,
            members: req.body.members,
            numMembers: req.body.numMembers,
        });

    room
        .save()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
    }
    
});

router.post("/updateRoom", async (req, res) => {
    const exists = await Room.exists({ roomCode: req.body.roomCode });
    if (exists === false) {
        res.status(500).json("The room doesn't exist");
    } else {
        Room.updateOne(
        { roomCode: req.body.roomCode },
        { 
          $push: { members: [req.body.username] }, 
          $inc: { numMembers: 1} 
        },
        function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    }
});

module.exports = router;