var db = require("../models");

module.exports = (app) => {


  app.get("/api/gifs", (req, res) => {
    db.Gif.findAll({}).then((dbGif) => {
      res.json(dbGif);
    });
  });

  app.post("/api/gifs", (req, res) => {
    db.Gif.create({
      text: req.body.text,
      complete: req.body.complete
    }).then((dbGif) => {
      res.json(dbGif);
    })
      .catch((err) => {
        res.json(err);
      });
  });

  app.delete("/api/gifs/:id", (req, res) => {
    db.Gif.destroy({
      where: {
        id: req.params.id
      }
    }).then((dbGif) => {
      res.json(dbGif);
    });

  });

  app.put("/api/gifs", (req, res) => {

    db.Gif.update({
      text: req.body.text,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then((dbGif) => {
      res.json(dbGif);
    })
      .catch((err) => {
        res.json(err);
      });
  });
};
