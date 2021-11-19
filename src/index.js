import app from './server.js';
import dbConnection from './db.js';
const port = process.env.PORT || 7001;

dbConnection.getConnect();

app.listen(port, () => {
  console.log(`Server connected at  http://localhost:${port}`);
});
