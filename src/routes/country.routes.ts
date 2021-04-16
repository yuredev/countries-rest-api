import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/', async (req, res) => {
  return res.json();
});

userRoutes.post('/', async (req, res) => {

});

userRoutes.put('/:countryId', (req, res) => {

});

userRoutes.delete('/:countryId', (req, res) => {

});
