<template>
  <div>
    <header>Quiz App</header>
    <template v-for="(question, index) in questions.questions">
      <div class="container" v-if="index === questionNumber">
        <h4>{{ index + 1 }}) {{ question.question }}</h4>

        <div class="questions" v-for="(answers, index) in allQuestions">
          <div
            class="question"
            v-if="index === questionNumber"
            v-for="(answer, index) in answers"
            @click="selectAlternative(answer)"
            :style="
              picked === answer
                ? { borderColor: '#1c9b61' }
                : { borderColor: '#0094da' }
            "
          >
            <!-- <input
              type="radio"
              :id="answer"
              :value="answer"
              name="question"
              v-model="picked"
              :checked="picked == answer"
            /> -->
            <div
              :style="
                picked === answer
                  ? {
                      backgroundColor: '#1c9b61',
                      transition: 'background 0.5s',
                    }
                  : { backgroundColor: '#0094da' }
              "
              class="alternative"
            >
              <label for="">{{ index + 1 }}</label>
            </div>
            <label class="answer" for="answer">{{ answer }}</label>
          </div>
        </div>
        <div class="button" v-if="!isFinish">
          <button
            :style="{
              borderColor: '#1c9b61',
              color: '#fff',
              backgroundColor: '#1c9b61',
            }"
            @click="next"
          >
            Next
          </button>
          <button v-if="questionNumber != 0" @click="previous">Previous</button>
        </div>
      </div>
    </template>

    <template v-if="isFinish">
      <div>
        <p v-if="hits.length >= 2">
          Congratulations! You hit {{ hits.length }} questions. You passed :D.
        </p>
        <p v-else>
          Oh no, you hit {{ hits.length }} questions and failed test :(.
        </p>
        <p>
          You finished quiz in
          {{ Math.floor((timeEnd - timeStart) / 1000) }} seconds
        </p>
      </div>
      <button @click="resetQuiz">Reset quiz</button>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
  computed,
  watch,
} from "vue";
import { useStore } from "vuex";
import { request } from "../helper/helper";
import { QuestionsType } from "../types/index";
export default defineComponent({
  setup() {
    const store = useStore();
    const questionNumber = ref(0);
    const picked = ref("");
    const isFinish = ref(false);
    const arrayPicked = ref<string[]>([]);

    const timeStart = computed(() => store.state.startTime);
    const timeEnd = computed(() => store.state.endTime);

    const questions = reactive<QuestionsType>({
      questions: [
        {
          question: "",
          correct_answer: "",
          incorrect_answers: [],
        },
      ],
    });

    onMounted(() => {
      request.then((resp) => (questions.questions = resp.results));
    });

    function selectAlternative(alernative: string) {
      picked.value = alernative;
    }

    function previous() {
      arrayPicked.value.pop();
      questionNumber.value--;
    }

    function next() {
      if (!picked.value) return;
      const isPicked = allQuestions.value[questionNumber.value].find(
        (question) => question == picked.value
      );
      if (!isPicked) return;

      if (questionNumber.value + 1 === questions.questions.length) {
        isFinish.value = true;
        const date = new Date();
        store.dispatch("setEndTime", date.getTime());
      }
      arrayPicked.value.push(picked.value);
      questionNumber.value++;
    }

    async function resetQuiz() {
      document.location.reload();
    }

    const allQuestions = computed(() =>
      questions.questions.map((question) => {
        const allQuestions = [
          ...question.incorrect_answers,
          question.correct_answer,
        ];
        return allQuestions.sort(() => Math.random() - 0.5);
      })
    );

    const correctAnswer = computed(() =>
      questions.questions.map((question) => question.correct_answer)
    );

    const hits = computed(() =>
      correctAnswer.value.filter((question) =>
        arrayPicked.value.includes(question)
      )
    );

    return {
      selectAlternative,
      timeStart,
      timeEnd,
      resetQuiz,
      hits,
      isFinish,
      correctAnswer,
      previous,
      next,
      picked,
      arrayPicked,
      questions,
      questionNumber,
      allQuestions,
    };
  },
});
</script>

<style scoped>
header {
  font-size: 20px;
  font-weight: 700;
  background-color: black;
  padding: 10px;
  color: rgb(78, 78, 228);
}

.container {
  display: flex;

  flex-direction: column;
  height: 400px;
  margin: 10px 200px;
  border: 1px solid gray;
}

.container h4 {
  margin: 0;
  width: 100%;
  background-color: #0094da;
  padding: 10px 0px;
  margin-bottom: 10px;
}

.container p {
  width: 100%;
  margin-left: 5px;
}

.questions {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.questions .question {
  display: flex;
  width: 95%;
  margin-bottom: 8px;

  border: 2px solid;
  cursor: pointer;
  transition: color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}

.questions .question:hover {
  transform: scale(1.03);
}

.alternative {
  display: flex;
  align-items: center;
  justify-content: center;

  /* background-color: #0094da; */
  color: #fff;
  font-size: 20px;
  width: 10%;
}
.alternative label {
}
.answer {
  display: flex;
  align-items: center;
  margin-left: 4px;
  padding: 12px 0;
  cursor: pointer;
}

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12px;
}

button {
  padding: 0;
  cursor: pointer;
  width: 95%;
  background-color: #fff;
  border: 2px solid #0094da;
  font-size: 20px;
  color: #0094da;
  transition: color 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}
button:hover {
  transform: scale(1.03);
}
</style>
