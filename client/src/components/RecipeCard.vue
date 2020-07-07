<template>
  <div @click="$router.push(`recipe/${recipe._id}`)" class="cursor-pointer card">
    <img class="shadow-xl" style="height: 240px" width="100%" :src="recipe.image" />
    <div class="recipe_card_information">
      <div style="text-align: left" class="recipe_card_title pl-3 pr-3">{{recipe.title}}</div>
      <div class="info">
        <p
          style="text-align: left; color: #707070; font-size: 30px"
          class="author pl-3"
        >By {{recipe.author.name}}</p>
        <div class="rating mx-2">

          <i v-for="(rating, index) in ratings" :class="rating" :key="index" aria-hidden="true"></i>
          <!-- <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i>
          <i class="fa fa-star" aria-hidden="true"></i> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecipeCard",
  props: ["content", "recipe"],
  data() {
    return {
      rating: '',
      ratings: [],
      isInteger: '', 
      arrayLength: 0,
      emptyStarCount: 0
    };
  },

  methods: {
    getRatings(rating) {
      //Rounds rating to nearest 0.5
      const roundedRating = Math.round(rating * 2) / 2;
      const isInteger = Number.isInteger(roundedRating);
      this.isInteger = isInteger;
      const arrayLength = isInteger ? roundedRating : Number(roundedRating.toString().split('.')[0]);      
      this.arrayLength = arrayLength;
      const filledStarArray = Array(arrayLength).fill("fa fa-star");
      console.log(filledStarArray);
      if (!isInteger) {
        filledStarArray.push("fa fa-star-half-o");
      }
      const emptyStarCount = isInteger ? 5 - arrayLength : 4 - arrayLength
      const emptyStarArray = Array(emptyStarCount).fill('fa fa-star-o');
      this.ratings = [...filledStarArray, ...emptyStarArray];
      
    }
  },
  mounted() {
    this.rating = this.recipe.rating;
    this.getRatings(this.recipe.rating);
  }
};
</script>

<style scoped>
.recipe_card_title {
  font-size: 45px;
  display: flex;
  grid-area: title;
  justify-content: start;
}

img {
  object-fit: cover;
}

.info {
  display: grid;
  grid-template-areas: "author rating";
  grid-area: info;
  grid-template-columns: 0.6fr 0.4fr;
}

.recipe_card_information {
  font-size: calc(16px + 6 * ((100vw - 320px) / 680));
  display: grid;
  grid-template-rows: 0.5fr 0.5fr;
  grid-template-areas:
    "title"
    "info";
}
.card {
  display: grid;
  grid-template-rows: 0fr 0.3fr;
  grid-template-areas:
    "recipe_image"
    "recipe_information";
  background: #a8dadc;
  font-family: American Typewriter;
  font-size: 3rem;
  color: #fff;
  box-shadow: rgba(3, 8, 20, 0.1) 0px 0.15rem 0.5rem,
    rgba(2, 8, 20, 0.1) 0px 0.075rem 0.175rem;
  height: 100%;
  width: 100%;
  border-radius: 20px;
  transition: all 500ms;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card:hover {
  box-shadow: rgba(2, 8, 20, 0.1) 0px 0.35em 1.175em,
    rgba(2, 8, 20, 0.08) 0px 0.175em 0.5em;
  transform: translateY(-3px) scale(1.1);
}
</style>