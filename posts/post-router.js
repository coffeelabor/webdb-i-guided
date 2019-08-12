const express = require("express");

// database access using knex
const db = require("../data/db-config.js");

const router = express.Router();

router.get("/", (req, res) => {
  // db('posts') //returns a promise that resolves to all records from the posts table
  db.select("id", "title", "contents")
    .from("posts")
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "bummer" });
    });
});

router.get("/:id", (req, res) => {
  db("posts")
    .where({ id: req.params.id })
    .first()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ message: "bummer" });
    });
});

router.post("/", (req, res) => {
  const post = req.body;
  //validate that the post data is correct before saving to the db
  db("posts")
    .insert(post, "id")
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ message: "bummer" });
    });
});

router.put("/:id", (req, res) => {
  const changes = req.body;
  db("posts")
    .where("id", "=", req.params.id)
    .update({ title: "new title" })
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "bummer" });
    });
});

router.delete("/:id", (req, res) => {
  db("posts")
    .where("id", "=", req.params.id)
    .delete()
    .then(count => {
      if (count > 0) {
        res.status(200).json(count);
      } else {
        res.status(404).json({ message: "not found" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "bummer" });
    });
});

// 15580, 15987

module.exports = router;
