<template>
  <div class="view" v-if="isOpen">
    <div class="container">
      <h1>Welcome the Quiz Game</h1>
      <div class="inner-container">
        <div class="img">
          <img :src="Check" alt="Check" />
        </div>
        <p>
          Test your standard knowledge in our quiz app. Click start to continue.
          Good Luck :D
        </p>
      </div>
      <button @click="startQuiz">Start</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import Check from "../assets/check.png";
export default defineComponent({
  setup() {
    const isOpen = ref(true);
    const store = useStore();
    //store.commit("increment");

    function startQuiz() {
      isOpen.value = false;
      const date = new Date();
      store.dispatch("setStartTime", date.getTime());
    }
    return {
      isOpen,
      Check,
      startQuiz,
    };
  },
});
</script>

<style scoped>
.view {
  width: 100vw;
  height: 100vh;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  background: rgba(100, 100, 100, 0.3);
}
.container {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  height: 300px;
  width: 350px;
  display: flex;
  flex-direction: column;
  background-color: rgb(255, 255, 255);
}
.inner-container {
  padding: 0 10px;
}
h1 {
  color: #fff;

  font-weight: 100;
  font-size: 20px;
  background-color: #1c9b61;
  padding: 20px;
  margin: 0;
}
.img {
  margin-top: 12px;
  width: 100%;
  display: flex;
  justify-content: center;
}
img {
  width: 80px;
}
p {
  text-align: center;
}
button {
  cursor: pointer;

  background-color: #fff;
  border: 2px solid #1c9b61;
  font-size: 20px;
  color: #1c9b61;
  margin-top: 20px;
  flex: 1;
}
button:hover {
  opacity: 0.8;
}
button:active {
  color: #14774a;
}
</style>
