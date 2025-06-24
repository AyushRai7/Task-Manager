const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const { sequelize } = require('./models');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

sequelize.sync().then(() => {
  app.listen(5000, () => console.log('Server started on port 5000'));
});