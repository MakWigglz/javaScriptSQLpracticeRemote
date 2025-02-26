const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); // for parsing application/json

// Sample board data (64 squares)
const board = Array.from({ length: 64 }, (_, i) => ({
  id: i + 1,
  subject: `Square ${i + 1}`,
  message: `This is square number ${i + 1}.  It's a very interesting place!`,
}));

// Dice roll endpoint
app.get('/roll', (req, res) => {
  const roll = Math.floor(Math.random() * 6) + 1;
  res.json({ roll });
});

// Square information endpoint
app.get('/square/:id', (req, res) => {
  const squareId = parseInt(req.params.id);
  const square = board.find(s => s.id === squareId);

  if (square) {
    res.json(square);
  } else {
    res.status(404).json({ error: 'Square not found' });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
