<template>
  <section class="basic-grid">
    <recipe-card
      v-for="(recipe, index) in recipes"
      :key="index"
      :recipe="recipe"
      content="Banana Pie"
      class="card"
    ></recipe-card>
</section>
</template>

<script>
import RecipeCard from "../components/RecipeCard.vue";
import axios from "axios";

export default {
  name: "Recipes",
  components: {
    RecipeCard
  },  
  data() {
    return {
      recipes: []
    };
  },
  async mounted() {
    const { data: recipes } = await axios.get(
      "http://localhost:3000/fetchAllRecipes"
    );

    this.recipes = recipes;
  }
};
</script>

<style>
.basic-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
</style>