const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


//Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw());


const recipes = require('./routes/api/recipes.js');
const items = require('./routes/api/items.js');
const production = require('./routes/api/production.js');
const sales = require('./routes/api/sales.js');
const users = require('./routes/api/users.js');


app.use('/api/recipes', recipes);
app.use('/api/items', items);
app.use('/api/production', production);
app.use('/api/sales', sales);
app.use('/api/users', users);

//Handle production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public/'));

    //Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));