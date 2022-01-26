
interface QuestionsType {
  questions: [
    {
      question: string;
      correct_answer: string;
      incorrect_answers: [];
    }
  ];
}

export { QuestionsType }