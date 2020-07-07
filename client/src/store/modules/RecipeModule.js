const RecipeModule = {
    namespaced: true,
    state: {
        recipes: []
    },
    getters: {
        getRecipes: state => {
            return state.recipes;
        },
        getRecipeById: state => id => state.recipes.find(recipe => recipe._id === id)
    },
    mutations: {
        setRecipes(state,payload) {            
            state.recipes = payload;
        }
    },
    actions: {
        setRecipes({ commit },payload) {
            commit("setRecipes",payload);
        }
    }
};

export {
    RecipeModule
}