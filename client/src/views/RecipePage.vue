<template>
  <div class="recipe_page">
    <div v-if="$mq === 'sm'" class="recipe_information_small shadow-2xl">
      <template v-if="recipeLoaded">
        <div style="text-align: left" class="recipe_title_small">
          <h1 class="ml-4">{{recipe.title}}</h1>

          <p class="mb-1 ml-2" style="font-size: 35px">By {{recipe.author.name}}</p>
        </div>
        <div class="recipe_picture" style="display: flex; justify-content: center">
          <img height="100%" width="95%" class="shadow-2xl recipe_image" :src="recipe.image" />
        </div>
        <div class="recipe_information_content_small">
          <div class="preparation_times mt-6 mb-2">
            <i
              style="font-size: 70px; color: #E6FAFC;"
              class="ml-8 fa fa-clock-o"
              aria-hidden="true"
            ></i>
            <div style="display: flex; flex-direction: column;">
              <p style="justify-self: start;">PREP: {{recipe.prep_time_min}} Mins</p>
              <p class="ml-2" style="justify-self: end;">COOK: {{recipe.cook_time_min}} Mins</p>
            </div>
            <i
              style="font-size: 60px; color: #E6FAFC;"
              class="ml-8 fa fa-cutlery"
              aria-hidden="true"
            ></i>
            <p class="ml-3">SERVES : {{recipe.servings}}</p>
          </div>
          <div class="description">
            <p class="ml-10">{{recipe.description}}</p>
          </div>
          <div class="rating mr-6 mt-6 mb-6">
            <i style="color: #E6FAFC; font-size: 50px" v-for="(rating, index) in ratings" :class="rating" :key="index" aria-hidden="true"></i>
          </div>
        </div>
      </template>
    </div>
    <div v-else class="recipe_information shadow-2xl">
      <template v-if="recipeLoaded">
        <div class="recipe_title">
          <h1 class="ml-4">{{recipe.title}}</h1>
          <p
            class="mb-1 ml-2"
            style="font-size: 35px; align-self: flex-end"
          >By {{recipe.author.name}}</p>
          <hr style="color: red" />
        </div>
        <div class="recipe_information_content">
          <div class="recipe_picture">
            <img
              height="100%"
              width="100%"
              class="shadow-2xl ml-6 mb-8 mt-5 recipe_image"
              :src="recipe.image"
            />
          </div>
          <div class="recipe_content">
            <div class="preparation_times">
              <i
                style="font-size: 70px; color: #E6FAFC;"
                class="ml-8 fa fa-clock-o"
                aria-hidden="true"
              ></i>
              <div style="display: flex; flex-direction: column;">
                <p style="justify-self: start;">PREP: {{recipe.prep_time_min}} Mins</p>
                <p class="ml-2" style="justify-self: end;">COOK: {{recipe.cook_time_min}} Mins</p>
              </div>
              <i
                style="font-size: 60px; color: #E6FAFC;"
                class="ml-8 fa fa-cutlery"
                aria-hidden="true"
              ></i>
              <p class="ml-3">SERVES : {{recipe.servings}}</p>
            </div>
            <div class="description">
              <p style="text-align: left;" class="ml-10">{{recipe.description}}</p>
            </div>
            <div class="rating mr-6 mt-6">              
              <i style="color: #E6FAFC; font-size: 50px" v-for="(rating, index) in ratings" :class="rating" :key="index" aria-hidden="true"></i>              
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="recipe_instructions mt-10 pt-10">
      <div class="instructions_card ingredients shadow-2xl">
        <template v-if="recipeLoaded">
          <div class="ml-4 instructions_title">
            <h1>Ingredients</h1>
            <div v-if="$mq === 'lg'" class="incrementor_wrapper">
              <h1
                style="font-family: American Typewriter; font-size: 20px; color: #2c3e50;"
              >Adjust Servings</h1>
              <incrementor
                :disabled="true"
                @valueChanged="handleServingSizeChange($event)"
                :incrementorValue="recipe.servings"
              />
            </div>
          </div>
          <div class="ingredients_content">
            <div style="text-align: left" class="ingredients_list">
              <div
                v-for="(ingredient, index) in renderedIngredients"
                :key="index"
                class="ingredient ml-4"
              >
                <span style="color:#E6FAFC">•</span>
                <span class="ml-1">{{ingredient.ingredient}}</span>
              </div>
            </div>
            <div v-if="$mq === 'md' || $mq === 'sm'" class="serving_incrementor">
              <div class="incrementor_wrapper">
                <h1 style="font-family: American Typewriter; font-size: 20px">Adjust Servings</h1>
                <incrementor
                  :disabled="true"
                  @valueChanged="handleServingSizeChange($event)"
                  :incrementorValue="recipe.servings"
                />
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="instructions_card instructions shadow-2xl">
        <template v-if="recipeLoaded">
          <div class="ml-4 instructions_title">
            <h1>Instructions</h1>
          </div>
          <div class="instructions_content">
            <div class="instruction" v-for="(instruction, index) in recipe.directions" :key="index">
              <div style="color: #E6FAFC" class="step">
                <h1 style="font-family: American Typewriter; font-size: 50px">{{index + 1}}.</h1>
              </div>
              <div class="description mr-4">
                <p style="font-size: 20px">{{instruction}}</p>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Incrementor from "../widgets/Incrementor.vue";
import { getBaseFractionForServingSize } from "../service/util";
export default {
  name: "Recipe Page",
  data() {
    return {
      recipeLoaded: false,
      recipe: {},
      ingredients: [],
      servingSize: 0,
      defaultServingSize: 0,
      originalServingSizes: [],
      ratings: [],
      rating: ""
    };
  },
  components: {
    Incrementor
  },
  computed: {
    renderedIngredients() {
      return this.ingredients.map(ingredient => {
        const changedValues = [];
        let replacedIngredient = ingredient.ingredient;
        ingredient.originalValues.forEach((value, index) => {
          const changedValue = getBaseFractionForServingSize(
            value,
            this.defaultServingSize,
            this.servingSize,
            Number.isInteger(Number(value))
          );
          const regex = new RegExp(
            "\\b" + ingredient.changedValues[index] + "\\b"
          );
          replacedIngredient = replacedIngredient.replace(regex, changedValue);
          changedValues.push(changedValue);
        });
        return {
          originalValues: ingredient.originalValues,
          changedValues,
          ingredient: replacedIngredient
        };
      });
    }
  },
  methods: {
    handleServingSizeChange(event) {
      const { value } = event;
      this.servingSize = value;
    },
    getRatings(rating) {
      //Rounds rating to nearest 0.5
      const roundedRating = Math.round(rating * 2) / 2;
      const isInteger = Number.isInteger(roundedRating);
      console.log(rating);
      const arrayLength = isInteger
        ? roundedRating
        : Number(roundedRating.toString().split(".")[0]);
      console.log(arrayLength);
      const filledStarArray = Array(arrayLength).fill("fa fa-star");
      if (!isInteger) {
        filledStarArray.push("fa fa-star-half-o");
      }
      const emptyStarCount = isInteger ? 5 - arrayLength : 4 - arrayLength;
      const emptyStarArray = Array(emptyStarCount).fill("fa fa-star-o");
      this.ratings = [...filledStarArray, ...emptyStarArray];
    }
  },

  async mounted() {
    const { id } = this.$route.params;
    const { data: recipe } = await axios.post(
      "http://localhost:3000/findIndividualRecipe",
      {
        id
      }
    );

    this.rating = recipe.rating;
    this.getRatings(recipe.rating);

    this.servingSize = recipe.servings;
    this.defaultServingSize = recipe.servings;

    this.ingredients = recipe.ingredients.map(ingredient => {
      //Match fractions such as 1/2 or 1 1/2
      const fractionRegex = /([1-9]+ {1})?[1-9]+\/[1-9]+ /gm;
      //Match just integers, excludes strings using such as 1 1/2 as well as numbers preceded by / or .
      const integerRegex = /(?![1-9]+ [1-9]+\/[1-9]+)(?<!\/|\.)[0-9]+ /gm;
      //Matches only decimal numbers
      const decimalRegex = /[0-9]+\.[0-9]+/gm;

      //Null coelesce so they can be spread
      let fractions = ingredient.match(fractionRegex) || [];
      let integers = ingredient.match(integerRegex) || [];
      let decimals = ingredient.match(decimalRegex) || [];

      //Set to prevent duplicates
      const originalValues = [
        ...new Set([...fractions, ...integers, ...decimals])
      ];
      if (originalValues.length > 0) {
        return {
          ingredient,
          originalValues: originalValues.map(value => value.trim()),
          changedValues: originalValues.map(value => value.trim())
        };
      }
      return {
        ingredient,
        originalValues: [],
        changedValues: []
      };
    });

    this.recipeLoaded = true;
    this.recipe = recipe;
  }
};
</script>

<style>
.recipe_information_content {
  display: grid;
  grid-template-columns: 0.2fr 0.8fr;
  grid-template-areas: "recipe_picture", "recipe_content";
}

.recipe_content {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.step {
  grid-area: step;
}

.description {
  grid-area: description;
}

.instructions_title {
  display: flex;
  justify-content: space-between;
}

.serving_incrementor {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}

.instructions {
  display: grid;
  grid-template-areas:
    "instructions_title"
    "instructions_content";
  grid-template-rows: 0.1fr 0.9fr;
}

.instructions_content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.instructions_title {
  display: flex;
  font-family: American Typewriter;
  font-size: 50px;
  color: #e6fafc;
}

.ingredients {
  display: grid;
  grid-template-areas:
    "instructions_title"
    "ingredients_content";
  grid-template-rows: 0.1fr 0.9fr;
}

.ingredient {
  display: flex;
  align-items: center;
  align-content: center;
  /* align-items: flex-start; */
  font-family: American Typewriter;
  font-size: 20px;
}

.instructions_card {
  border-radius: 20px;
  background-color: #a8dadc;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.description {
  display: flex;
  justify-content: start;
  align-self: center;
  text-align: start;
  font-family: American Typewriter;
  font-size: 30px;
  grid-area: description;
}

.instruction {
  display: grid;
  grid-template-areas: "step description";
  grid-template-columns: 0.2fr 0.8fr;
}

.preparation_times {
  display: flex;
  align-items: center;
  grid-area: preparation_times;
}

.rating {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* align-content: flex-end; */
  grid-area: rating;
}

.recipe_title {
  display: flex;
  font-family: American Typewriter;
  font-size: 65px;
  color: #e6fafc;
}

.recipe_image {
  border-radius: 20px;
}

.recipe_information {
  display: grid;
  grid-template-rows: 0.1fr 1fr;
  grid-template-areas:
    "recipe_title"
    "recipe_information_content";
  border-radius: 20px;
  height: 100%;
  width: 100%;
  grid-area: recipe_information;
  background-color: #a8dadc;
}

@media (max-width: 800px) {
  .recipe_information_small {
    display: grid;
    grid-template-rows: 0.1fr 0.3fr 0.4fr;
    grid-template-areas:
      "recipe_title"
      "recipe_picture"
      "recipe_information_content";
    border-radius: 20px;
    height: 100%;
    width: 100%;
    grid-area: recipe_information;
    background-color: #a8dadc;
  }

  .preparation_times {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    /* align-items: center; */
    grid-area: preparation_times;
  }

  .rating {
    display: flex;
    align-items: center;
    justify-content: center;
    /* align-content: flex-end; */
    grid-area: rating;
  }

  .recipe_title_small {
    display: flex;
    flex-direction: column;
    font-family: American Typewriter;
    font-size: 65px;
    color: #e6fafc;
  }
  .recipe_information_content_small {
    display: grid;
    grid-template-rows: 0.3fr 0.3fr 0.4fr;
    grid-template-areas:
      "preparation_times"
      "description"
      "rating";
  }
}

.recipe_instructions {
  height: 100%;
  width: 100%;
  grid-area: recipe_instructions;
  /* background-color: blue; */
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(25em, 1fr));
}
</style>