const Joueur = require('../models/joueur');
//Create 
const AjouterJoueur = async(req,res)=>
{
    const {pseudo,sante,score}=req.body;
    try{
    const joueur = new Joueur({pseudo,sante,score});
    await joueur.save();
    res.send(200,"Joueur ajouté avec succès");}
    catch{
        res.status(500).json({error:"Erreur d'ajout d'un joueur"});
    }
}
//GET ALL
const GetJoueurs = async(req,res)=>{
    try{
        const joueurs = await Joueur.find();
        res.send(200,joueurs);
    }catch{
        res.send(500,"Erreur de récupération de joueurs")
    }
}
//Get by id 
const GetJoueursById = async(req,res)=>{
    try{
    const joueur = await Joueur.findById(req.params.id);
res.send(200,joueur);
}catch{
    res.send(500,err);
}
}

//Supprimer joueur
const SupprimerJoueur = async(req,res)=>{
    try{
        await Joueur.findByIdAndDelete(req.params.id);
        res.send(200,"Joueur supprimé avec succès");
    }catch{
        res.send(500,"Erreur de suppression de joueur");
    }
}
//fonction attaque
const attaque = async(req,res)=>{
    try{
        const attaquant = await Joueur.findById(req.params.idAttaquant);
        const victime = await Joueur.findById(req.params.idVictime);
        attaquant.score += 10;
        victime.sante-=20;
        await attaquant.save();
        await victime.save();
        res.json({attaquant,victime});
    }catch{
        res.send(500,"Erreur d'attaque");}
}
module.exports = {AjouterJoueur,GetJoueurs,GetJoueursById,SupprimerJoueur,attaque};