const express = require ('express');
const app = express ();
//include the method-override package
const methodOverride = require('method-override');

//middleware
 app.use(express.static('public'))
app.use(methodOverride('_method'));

//models
const mangoSeed = require ('./models/seed.js')
const Products = require('./models/products.js')

//creates req.body
app.use(express.urlencoded({extended:true}));

//connect to Mongoose
const mongoose = require('mongoose');

//some mongoose magic?
mongoose.connect('mongodb://localhost:27017/mangostore', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
  console.log('The connection with mongod is established')
})

//new route
app.get('/mango/new', (req, res) => {
    res.render('new.ejs')
})

//index route
app.get('/mango', (req, res) => {
  Products.find({}, (error, wtf) => {
    res.render('index.ejs',
        {
          mangoes: wtf
        }
    );
  });
});

//show route
app.get('/mango/:id', (req, res) => {
  Products.findById(req.params.id, (error, foundProduct) => {
    res.render('show.ejs',{
      product: foundProduct
    })
  })
})

app.post('/mango', (req, res) => {
  Products.create(req.body, (error, createdProduct) => {
      res.redirect('/mango');
  });
});


app.delete('/mango/:id', (req, res) => {
  Products.findByIdAndRemove(req.params.id, (error, deletedProduct) => {
    res.redirect('/mango')
  })
})

app.get('/mango/:id/edit', (req, res) => {
  Products.findById(req.params.id, (error, foundProduct) => {
    res.render('edit.ejs',
    {
      product: foundProduct
    }
  );
  })
})

app.put('/mango/:id', (req, res) => {
  Products.findByIdAndUpdate( req.params.id, req.body, {new: true}, (error, updatedModel) => {
    res.send(error.message);
  })
})


// Products.create(mangoSeed, (err, seedProducts) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(seedProducts);
//       }
// })





app.listen(3000, (req, res) => {
  console.log("NOW we're GROOVIN");
})
