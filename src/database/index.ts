import mongoose from 'mongoose';

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27018/countries', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error'));
database.once('open', () => console.log('✅️ mongodb connected successfully'));

mongoose.Promise = Promise;
