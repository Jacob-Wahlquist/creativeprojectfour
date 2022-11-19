const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: false
}));
const mongoose = require('mongoose');
// parse application/json
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, GET, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
mongoose.connect('mongodb://localhost:27017/test', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
app.use(express.static('public'));

/*let races = [];
let classes = [];
let backgrounds = [];
let characters = [];*/
let charSchema = new mongoose.Schema({
  name: String,
  race: String,
  cclass: String,
  background: String,
  level: String
});
charSchema.virtual('id')
  .get(function() {
    return this._id.toHexString();
  });
charSchema.set('toJSON', {
  virtuals: true
  });
const Character = mongoose.model('Character',charSchema);
let id = 0;


/*const getData = async () => {
        await fetch(`https://api.open5e.com/races/?format=json`,{method:"GET"})
        .then((res) =>  res.json())
        .then((response) => races = response.results);
    }
useEffect(() => {
        getRaces();
    }, []) */
app.get('/api/races', async (req, res) => {
  try {
    await fetch(`https://api.open5e.com/races/?format=json`,{method:"GET"})
        .then((res) =>  res.json())
        .then((response) => res.send(response));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/classes', async (req, res) => {
  try {
    await fetch(`https://api.open5e.com/classes/?format=json`,{method:"GET"})
        .then((res) =>  res.json())
        .then((response) => res.send(response));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});
app.get('/api/backgrounds', async (req, res) => {
  try {
    await fetch(`https://api.open5e.com/backgrounds/?format=json`,{method:"GET"})
        .then((res) =>  res.json())
        .then((response) => res.send(response));
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/characters', async (req, res) => {
  try {
    let characters = await Character.find();
    res.send({characters: characters});
  } catch (error) {
    console.log(error);
    res.sendStatus(500)
  }
  
});
app.get('/api/characters/:id', (req, res) => {
    let found = characters.find(element => element.id = parseInt(req.params.id));
  res.send(found);
});
app.post('/api/characters', async (req, res) => {
  
  const character = new Character({
    name: req.body.name,
    race: req.body.race,
    cclass: req.body.cclass,
    background: req.body.background,
    level: req.body.level
  });
  try {
    await character.save();
    res.send({character:character});
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
  /*characters.push(character);
  res.send(character);*/
});
app.delete('/api/characters/:id', async (req, res) => {
  try {
    await Character.deleteOne({_id: req.params.id});
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
    /*let removeIndex = characters.map(character => {
      return character.id;
    })
    .indexOf(id);
    if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that character doesn't exist");
    return;
    
    }
    characters.splice(removeIndex,1);
    res.sendStatus(200);*/
    
});
/*app.get('/api/cart', (req, res) => {
  res.send(cart);
});
app.post('/api/cart/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let findIndex = cart.map(product => {
      return product.id;
    })
    .indexOf(id);
  if (findIndex === -1) {
      let cartProduct = {
        id: id,
        quantity: 1
        };
      cart.push(cartProduct);
      res.send(cartProduct);
  } else {
      cart[findIndex].quantity = cart[findIndex].quantity + 1;
      res.send(cart[findIndex]);
  }
});*/
app.put('/api/characters/:id/:level', (req, res) => {
  let id = parseInt(req.params.id);
  let level = parseInt(req.params.id);
  let characterMap = characters.map(character => {
    return character.id;
  });
  let index = cartMap.indexOf(id);
  if (index === -1) {
    res.status(404)
      .send("Sorry, that character doesn't exist");
    return;
  }
  let character = characters[index];
  character.level = level;
  res.send(character);
});
/*app.delete('/api/cart/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = cart.map(cartProduct => {
      return cartProduct.id;
    })
    .indexOf(id);
  if (removeIndex === -1) {
    res.status(404)
      .send("Sorry, that item doesn't exist");
    return;
  }
  cart.splice(removeIndex, 1);
  res.sendStatus(200);
});*/
app.listen(3000, () => console.log('Server listening on port 3000!'));