import './database';
import express from 'express';
import countryRoutes from './routes/country.routes';
const app = express();

app.use(express.json());
app.use('/countries', countryRoutes);

app.listen(3333, () => console.log('🚀 Server running on: http://localhost:3333/'));
