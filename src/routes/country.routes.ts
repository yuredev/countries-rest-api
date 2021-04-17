import { Router } from 'express';
import { CountryModel, ICountry } from '../models/country';

const routes = Router();

routes.get('/', async (req, res) => {
  try {
    const countries: ICountry[] = await CountryModel.find(); 
    return res.json(countries);
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: 'It seems that something went wrong with your request' });
  }
});

routes.post('/', async (req, res) => {
  try {
    const { name, capital, currency, language, population, area } = req.body;

    const countryFound = await CountryModel.findOne({ name });

    if (countryFound) {
      return res.status(409).json({ error: 'There are another country with this name' })
    }

    const countryCreated = await CountryModel.create({
      name,
      capital,
      currency,
      language,
      population,
      area,
    });
    return res.status(201).json(countryCreated);
  } catch (error) {
    console.error(error);
    return res.status(403).json({ error: 'It seems that something went wrong with your request' });
  }
});

routes.put('/:countryId', (req, res) => {});

routes.delete('/:countryId', (req, res) => {});

export default routes;
