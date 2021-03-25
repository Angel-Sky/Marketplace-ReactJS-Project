const express = require('express');
const app = express();
const {PORT} = require('./config/config');
const cors = require('cors')
const routes = require('./routes');

app.use(cors());
require('./config/express')(app);
require('./config/mongoose');

app.use(routes);
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
