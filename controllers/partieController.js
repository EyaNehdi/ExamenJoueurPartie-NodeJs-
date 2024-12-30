const Partie = require('../models/partie');
const Joueur = require('../models/joueur');
const { get } = require('mongoose');

const ajouterPartie = async(req,res)=>{
try{
    const {nom}=req.body;
    const joueur1 = await Joueur.findById(req.params.idJoueur1);
    const joueur2 = await Joueur.findById(req.params.idJoueur2);

    const partie = new Partie({
        nom,
        joueur_1:joueur1.id,
        joueur_2:joueur2.id,
        etat:"en cours"
    });
    await partie.save();
    res.send(200,"Partie ajoutée avec succès");

}catch{
    res.send(500,"Erreur d'ajout d'une partie");
}
}

//GET ALL 
const getParties = async(req,res)=>{
    try{
const parties = await Partie.find();
res.render('../views/partie.twig',{parties});
    }catch{
        res.send(500,"Erreur de récupération de parties");
    }

}
module.exports = {ajouterPartie,getParties};