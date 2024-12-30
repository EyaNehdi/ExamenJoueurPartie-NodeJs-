const express = require('express');
const router = express.Router();
const {AjouterJoueur,GetJoueurs,GetJoueursById,SupprimerJoueur,attaque} = require('../controllers/joueurController');

//Ajouter joueur
router.post('/add',AjouterJoueur);

//Get all joueurs
router.get('/getAll',GetJoueurs);

//Get joueur by id
router.get('/getById/:id',GetJoueursById);

//Supprimer joueur
router.delete('/delete/:id',SupprimerJoueur);

//Attaquer un joueur
router.post('/attaque/:idAttaquant/:idVictime',attaque);
module.exports = router;