import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import connectDb from './config/connectDb.js';

require('dotenv').config()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

connectDb();

routes(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
