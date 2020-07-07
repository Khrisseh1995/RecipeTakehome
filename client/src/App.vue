<template>
  <div>
    <div class="navbar shadow-xl">
      <h1 @click="$router.push({path: '/'})" class="header_text pl-10 cursor-pointer">{{headerTitle}}</h1> <br/>        
    </div>
    <div id="app">
      <router-view />      
    </div>
  </div>
</template>

<script>

export default {
  name: "App",
  computed: {
    headerTitle() {
      if(this.$mq === 'sm') {
        return "NR"
      }
      return "NutshellRecipes";
    }
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
