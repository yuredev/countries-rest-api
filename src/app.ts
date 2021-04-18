import './database';
import express from 'express';
import countryRoutes from './routes/country.routes';
import cors from 'cors';

const app = express();

console.log(process.env.NODE_ENV);

app.use(cors());
app.use(express.json());
app.use('/countries', countryRoutes);

app.listen(process.env.PORT || 3333, () => console.log('🚀 Server running'));
