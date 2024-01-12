export type QuizType = {
  id: number,
  name: string,
  questions: Array<QuizQuestionType>,
};

export type QuizQuestionType = {
  id: number,
  question: string,
  answers: Array<QuizAnswerType>,
};

export type QuizAnswerType = {
  id: number,
  answer: string,
};

// Correct answers

export type QuizAnswersType = {
  test: {
    id: number,
    name: string,
    questions: Array<QuizQuestionAnswersType>,
  }
};

export type QuizQuestionAnswersType = {
  id: number,
  question: string,
  answers: Array<QuizAnswerCorrectType>,
};


export type QuizAnswerCorrectType = {
  id: number,
  answer: string,
  correct: string
};
