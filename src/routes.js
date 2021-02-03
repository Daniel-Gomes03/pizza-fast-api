const routes = require('express').Router()
const { v4, isUuid } = require('uuid');
const options = require('./config/options.json')

function validatePizzaId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid pizza ID.' });
  }

  return next();
}

routes.use('/pizza/:id', validatePizzaId);

routes.get('/options', (request, response) => {
  return response.send(options);
})

routes.get('/pizza', (request, response) => {
  const { name } = request.query;

  const results = name 
    ? pizzas.filter(pizza => pizza.name.includes(name))
    : pizzas;

  return response.json(results);
});

routes.post('/pizza', (request, response) => {
  const { name, address, size, crustType, toppings, finalPrice } = request.body;

  const newPizza ={ id: v4(), name, address, size, crustType, toppings, finalPrice };

  pizzas.push(newPizza);

  return response.json(newPizza);
});

routes.delete('/pizza/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = pizzas.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Pizza not found.' });
  }

  pizzas.splice(projectIndex, 1)

  return response.status(204).send();
});

module.exports = routes;
