const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

morgan.token("body", (req, res) => {
  return JSON.stringify(req.body || {});
});

app.use(express.static("build"));

app.use(cors());

app.use(express.json());

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms - :body"
  )
);

const getTime = () => {
  const currentDate = new Date();
  return currentDate;
};

const generateId = () => {
  return Math.floor(Math.random() * 1000);
};

const getAllPersons = () => {
  return persons;
};

app.get("/api/persons", (req, res) => {
  const allPersons = getAllPersons();
  return res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } else if (persons.some((item) => item.name === body.name)) {
    return res.status(400).json({ error: "name must be unique" });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  };

  persons = persons.concat(person);

  res.json(person);
});

app.get("/info", (req, res) => {
  res.send(`PhoneBook has info for ${persons.length} people, ${getTime()}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const person = persons.find((item) => item.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).send("person not found").end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  persons = persons.filter((person) => person.id !== id);

  res.status(204).end;
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
