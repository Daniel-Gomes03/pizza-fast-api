const { Router } = require('express');
const { v4 } = require('uuid');

const Pizza = require('./app/models/pizza');
const options = require('./config/options.json');

const routes = Router();

routes.get('/options', (request, response) => {
  return response.send(options);
});

routes.get('/pizzas/:id', async (request, response) => {

  console.log(request.params);
  try {
    const { id } = request.params;

    const results = await Pizza.find({_id: id});

    return response.json(results);
  } catch (error) {
    return response
    .status(400)
    .json({ message: error.message || "Unexpected error." });
  }
});

routes.post('/pizzas', async (request, response) => {
  try {
    const { name, address, size, crustType, toppings, finalPrice } = request.body;
    const newPizza = { id: v4(), name, address, size, crustType, toppings, finalPrice };

    const createPizza = await Pizza.create(newPizza);

    return response.status(200).json(createPizza);
  } catch (error) {
    return response
    .status(400)
    .json({ message: error.message || "Unexpected error." });
  }
  
});

routes.delete('/pizzas/:id', async (request, response) => {
  try {
    const { id } = request.params;

    await Pizza.deleteOne({_id: id})
  
    response.status(204).json({});
    
  } catch (error) {
    return response
    .status(400)
    .json({ message: error.message || "Unexpected error." });
  }
});

module.exports = routes;
