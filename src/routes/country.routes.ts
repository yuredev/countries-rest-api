import { Router } from 'express';
import validateCountryBodyParams from '../middlewares/validateCountryBodyParams';
import { CountryModel, ICountry } from '../models/country';

const routes = Router();

routes.get('/', async (req, res) => {
  try {
    const countries: ICountry[] = await CountryModel.find().exec();
    return res.json(countries);
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ error: 'It seems that something is wrong in the request' });
  }
});

routes.get('/:countryId', async (req, res) => {
  try {
    const { countryId } = req.params;
    const country = await CountryModel.findById(countryId);
    if (!country) {
      return res
        .status(404)
        .json({ error: `No country found with the id: ${countryId}` });
    }
    return res.json(country);
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ error: 'It seems that something is wrong in the request' });
  }
});

routes.post('/', validateCountryBodyParams, async (req, res) => {
  try {
    const country: ICountry = req.res?.locals.country;

    const countryFound = await CountryModel.findOne({
      name: country.name,
    }).exec();

    if (countryFound) {
      return res
        .status(409)
        .json({ error: 'There are another country with this name' });
    }

    const countryCreated = await CountryModel.create(country);
    return res.status(201).json(countryCreated);
  } catch (error) {
    console.error(error);
    return res
      .status(403)
      .json({ error: 'It seems that something is wrong in the request' });
  }
});

routes.put('/:countryId', validateCountryBodyParams, async (req, res) => {
  try {
    const country: ICountry = req.res?.locals.country;
    const { countryId } = req.params;
    if (!countryId) {
      return res.status(403).json({ error: 'Missing country id param' });
    }
    const countryFound = await CountryModel.findById(countryId).exec();

    if (!countryFound) {
      return res
        .status(404)
        .json({ error: `No country found with the id: ${countryId}` });
    }

    countryFound.update(country);
  } catch (error) {
    return res
      .status(403)
      .json({ error: 'It seems that something is wrong in the request' });
  }
});

routes.delete('/:countryId', (req, res) => {});

export default routes;
