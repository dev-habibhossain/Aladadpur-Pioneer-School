import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Spik SMS Backend Running...');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});