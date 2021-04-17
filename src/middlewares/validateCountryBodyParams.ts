import { Request, Response, NextFunction } from 'express';

export default function validateBodyCountryParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, capital, currency, language, population, area } = req.body;

  if (
    [name, capital, currency, language, population, area].includes(undefined)
  ) {
    return res.status(403).json({ error: 'Missing body params' });
  }

  res.locals.country = { name, capital, currency, language, population, area };

  next();
}
