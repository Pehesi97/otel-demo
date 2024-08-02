const express = require('express');
const router = express.Router();

const todos = [{
  task: "Instrument the frontend and backend with OpenTelemetry",
}, {
  task: "Create a free account in Grafana Cloud",
}, {
  task: "Send OpenTelemetry data to Grafana Tempo",
}, {
  task: "Check the traces in Tempo",
}];

router.get('/', (_req, res, _next) => {
  res.status(200).json({ todos });
});

router.post('/', (req, res, _next) => {
  try {
    todos.push(req.body.todo);
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
