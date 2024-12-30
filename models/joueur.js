const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Joueur = new Schema({
    pseudo : String,
    sante : {type : Number,default:100},
    score : {type : Number,default:0}
});
module.exports = mongoose.model('Joueur', Joueur);