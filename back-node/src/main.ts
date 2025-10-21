import express from "express";
import { eventList } from "./feature/event-list";
import { eventById } from "./feature/event-by-id";
import { reserveById } from "./feature/reserve-by-id";
import { reserveSave } from "./feature/reserve-save";

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/events", function (req, res, next) {
  eventList()
    .then((events) => res.send(events))
    .catch(next);
});

app.get("/events/:id", function (req, res, next) {
  eventById(req.params.id)
    .then((response) => {
      if (response == null) {
        res.status(404).send("Event not found");
      } else {
        res.send(response);
      }
    })
    .catch(next);
});

app.get("/reserve/:id", function (req, res, next) {
  reserveById(req.params.id)
    .then((response) => {
      if (response == null) {
        res.status(404).send("Reserve not found");
      } else {
        res.send(response);
      }
    })
    .catch(next);
});

app.post("/reserve", function (req, res, next) {
  reserveSave(req.body)
    .then((response) => {
      res.json(response);
    })
    .catch(next);
});

app.listen(3000);
