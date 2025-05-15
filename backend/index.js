import express, { json } from 'express';
const app = express();
import apiRoutes from './routes/api.js';

app.use(json());

// Routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});