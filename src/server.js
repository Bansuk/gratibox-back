import './setup.js';
import app from './App.js';

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
