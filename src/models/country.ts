import { model, Schema, Document } from 'mongoose';

interface ICountry extends Document {
  name: string;
  capital: string;
  currency: string;
  language: string;
  population: number;
  area: number;
}

const CountrySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
  capital: {
    type: String,
  },
  currency: {
    type: String,
  },
  language: {
    type: String,
  },
  population: {
    type: Number,
  },
  area: {
    type: Number
  }
});

const CountryModel = model<ICountry>('Country', CountrySchema);

export { CountryModel, ICountry };