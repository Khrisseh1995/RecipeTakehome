const {Schema, model} = require('mongoose')

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    directions: {
        type: [String],
        required: true
    },
    servings: {
        type: Number,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    author: {
        type: Map,
        of: String
    },
    imageUrl: {
        type: String,
        required: false
    },
    sourceUrl: {
        type: String,
        required: true
    }
},
{ collection : 'recipe' }
);

module.exports = model('recipe', recipeSchema)