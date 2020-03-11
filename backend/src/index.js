import { join } from 'path';

import express from 'express';
const bodyParser = require('body-parser');
import cors from 'cors';

import assetsRoutes from './routes/assets-routes';
import usersRoutes from './routes/users-routes';
import AssetCRABRouter from './routes/AssetCRABRouter';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(cors());
app.get("/hello", (req, res)=>{
  res.json(55);
});

app.use('/api/users', usersRoutes);
   
const CRABRouter = new AssetCRABRouter().getRouter();
app.use("/api/crab",CRABRouter);


app.use('/api/assets', assetsRoutes);

app.listen(process.env.PORT || 5000);
console.log('Server connected', process.env.PORT || 5000);
