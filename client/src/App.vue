<template>
  <div>
    <div class="navbar shadow-xl">
      <h1 @click="$router.push({path: '/'})" class="header_text pl-10 cursor-pointer">NutshellRecipes</h1> <br/>        
    </div>
    <div id="app">
      <router-view />
      <!-- <section class="basic-grid">
        <recipe-card :recipe="recipe" content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
        <recipe-card content="Banana Pie" class="card"></recipe-card>
      </section> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
// import RecipeCard from "./components/RecipeCard.vue";

export default {
  name: "App",
  components: {
    // HelloWorld
    // RecipeCard
  },
  data() {
    return {
      recipe: {
        title: "Banana Oatmeal Cookie",
        description:
          "This recipe has been handed down in my family for generations. It's a good way to use overripe bananas. It's also a moist cookie that travels well either in the mail or car.",
        ingredients: [
          "1 1/2 cups sifted all-purpose flour",
          "1/2 teaspoon baking soda",
          "1 teaspoon salt",
          "1/4 teaspoon ground nutmeg",
          "3/4 teaspoon ground cinnamon",
          "3/4 cup shortening",
          "1 cup white sugar",
          "1 egg",
          "1 cup mashed bananas",
          "1 3/4 cups quick cooking oats",
          "1/2 cup chopped nuts"
        ],
        directions: [
          "Preheat oven to 400 degrees F (200 degrees C).",
          "Sift together the flour, baking soda, salt, nutmeg and cinnamon.",
          "Cream together the shortening and sugar; beat until light and fluffy. Add egg, banana, oatmeal and nuts. Mix well.",
          "Add dry ingredients, mix well and drop by the teaspoon on ungreased cookie sheet.",
          "Bake at 400 degrees F (200 degrees C) for 15 minutes or until edges turn lightly brown. Cool on wire rack. Store in a closed container."
        ],
        servings: 24,
        tags: ["dessert", "fruit"],
        author: {
          name: "Blair Bunny",
          url: "http://allrecipes.com/cook/10179/profile.aspx"
        },
        source_url:
          "http://allrecipes.com/Recipe/Banana-Oatmeal-Cookie/Detail.aspx"
      }
    };
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Noto+Sans&display=swap");

*,
*:before,
*:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

 /* Hide scrollbar for Chrome, Safari and Opera */
.example::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.example {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
} 

#app {
  padding: 40px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
}

.navbar {  
  justify-content: start;
  align-items: center;
  /* flex-direction: column; */
  display: flex;
  width: 100%;
  height: 100px;
  background-color: #A8DADC
}

body {
  background-color: #e6fafc;
}

.header_text {
  font-size: 65px;

  font-family: American Typewriter;
  color: #E6FAFC;
}

.basic-grid {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
}
</style>
