const mongoose = require ('mongoose')

const mangoSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  img: {type: String},
  price: {type: Number},
  qty: {type: Number}
})

const Mango = mongoose.model('Mango', mangoSchema);

module.exports = Mango;
