const express = require('express');
const router = express.Router();
const {ajouterPartie,getParties} = require('../controllers/partieController');
//ajout et affectation partie
router.post('/add/:idJoueur1/:idJoueur2',ajouterPartie);
//Get all parties
router.get('/getAll',getParties);
module.exports = router;