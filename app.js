import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import dbConnectString from './database';
import routes from './routes';

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use('/api', routes);

// database connection
mongoose.connect(dbConnectString, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Database connection error: "));
db.once("open", function () {
  console.log("Database Connected successfully");
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})