const { Router } = require('express');
const Recipe = require('../models/Recipe');

const router = Router();

router.get('/fetchAllRecipes',(req,res) => {
    Recipe.find({},(err,recipes) => {
        if (err) return res.status(500).send({
            message: err
        });
        console.log(recipes);
        res.status(200).send(recipes);
    })
});

router.post('/findIndividualRecipe',(req,res) => {
    const hasId = Object.keys(req.body).includes('id');
    if (!hasId) {
        res.status(500).send({
            message: 'Request must contain an id field'
        })
    }
    const { id } = req.body;

    Recipe.findOne({ '_id': id },(err,recipe) => {
        if (err) return res.status(500).send({
            message: err
        });
        res.status(200).send(recipe);
    });    
})

module.exports = router