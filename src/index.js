const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

/**
 * cpf: string
 * name: string
 * id - uuid
 * statement: []
 */
app.post("/account", (request, response) => {
  const { cpf, name } = request.body;

  const costumerAlreadyExists = customers.some(
    (customer) => customer.cpf === cpf
  );

  if (costumerAlreadyExists) {
    return response.status(400).json({
      error: "Customer already exists!",
    });
  }

  customers.push({ cpf, name, id: uuidv4(), statment: [] });

  return response.status(201).send();
});

app.get("/statement/:cpf", (request, response) => {
  const { cpf } = request.params;

  const customer = customers.find((costumer) => costumer.cpf === cpf);

  if (!customer) return response.status(400).json({ error: "Customer not found!" });

  return response.json(customer.statment);
});

app.listen(3333);
