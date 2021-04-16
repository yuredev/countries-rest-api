import mongoose from 'mongoose';

mongoose.connect('localhost:27018/, ', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const database = mongoose.connection;

database.on('error', console.error.bind(console, 'connection error'));
database.once('open', () => console.log('mongodb connected'));

mongoose.Promise = Promise;
export default mongoose;
