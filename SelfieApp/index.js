const express = require('express');
const Datastore = require('nedb');
//client side/serverside
const app = express();
//app listening on port 3000
app.listen(3000, () => console.log('listening at 3000'));
// we need static page to host website. .static' point to folder where html lives
app.use(express.static('public'));
// we set a json limit
app.use(express.json({ limit: '1mb' }));
/// our db which holds json data. for our /api fetch()
const database = new Datastore('database.db');
//loads a db for us.
database.loadDatabase();



///.get works with fetch()
app.get('/oracle', (request, response) => {
  // querying database. find() to find everything. takes object and callback. 
  // we want to call find have the data come back. then pass data to client
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});
//fetch is a promise. can be used async
// 'specifying route with post' works with fetch() from sketch.js that works with public folder - request holds all datas thats being sent from client, response we use to send things back to client
app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  // we save stuff inside db  with .insert()
  database.insert(data);
  //what we send back to client
  response.json(data);
});