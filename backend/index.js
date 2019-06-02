const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const routes = require('./routes/students.routes');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(cors());
app.use('/BongBong', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', routes);
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err)
  } else if (err.kind === 'ObjectId') {
    return res.status(404).send({
      message: "Student not found with that id"
    });
  }
  res.status(err.statusCode || err.status || 500).send({
    message: err.message
  })
});

mongoose.connect("mongodb://localhost/BongBong", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(() => {
  console.log("Successfully connected to the database");
}).catch(err => {
  console.log('Could not connect to the database. Exiting now...', err);
  process.exit();
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
