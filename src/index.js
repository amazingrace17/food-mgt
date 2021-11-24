import app from './server.js';
import dbConnection from './db.js';
const port = process.env.PORT || 5000;

dbConnection.getConnect();

app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});
