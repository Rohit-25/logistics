const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

const authRoutes = require('./routes/api.auth/api.auth')
const userRoutes = require('./routes/api.user/user.route')
const roleRoutes = require('./routes/api.roles/roles.route')
const permissionRoutes = require('./routes/api.permission/permission.route')
const menuRoutes = require("./routes/api.menu/menu.route")

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));



app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});
app.use('/api',authRoutes)
app.use('/api',userRoutes);
app.use('/api', roleRoutes);
app.use('/api',permissionRoutes)
app.use('/api',menuRoutes)

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
