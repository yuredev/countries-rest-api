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
    let countryFound: ICountry | null;
    try {
      countryFound = await CountryModel.findById(countryId).exec();
      if (!countryFound) {
        return res
          .status(404)
          .json({ error: `No country found with the id: ${countryId}` });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ error: `No country found with the id: ${countryId}` });
    }
    return res.json(countryFound);
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
  const { countryId } = req.params;
  try {
    const country: ICountry = req.res?.locals.country;
    if (!countryId) {
      return res.status(403).json({ error: 'Missing country id param' });
    }

    let countryFound: ICountry | null;
    try {
      countryFound = await CountryModel.findById(countryId).exec();
      if (!countryFound) {
        return res
          .status(404)
          .json({ error: `No country found with the id: ${countryId}` });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ error: `No country found with the id: ${countryId}` });
    }

    await countryFound.update(country, {
      new: true,
    });

    return res.status(200).json({ message: 'Successfully updated' });
  } catch (error) {
    console.error(error);
    return res
      .status(404)
      .json({ error: `No country found with the id: ${countryId}` });
  }
});

routes.delete('/:countryId', async (req, res) => {
  try {
    const { countryId } = req.params;
    if (!countryId) {
      return res.status(403).json({ error: 'Missing country id param' });
    }

    let countryFound: ICountry | null;
    try {
      countryFound = await CountryModel.findById(countryId).exec();
      if (!countryFound) {
        return res
          .status(404)
          .json({ error: `No country found with the id: ${countryId}` });
      }
    } catch (error) {
      return res
        .status(404)
        .json({ error: `No country found with the id: ${countryId}` });
    }

    const countryDeleted: ICountry = await countryFound.delete();

    return res.status(200).json(countryDeleted);
  } catch (error) {
    return res
      .status(403)
      .json({ error: 'It seems that something is wrong in the request' });
  }
});

export default routes;
