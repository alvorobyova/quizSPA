import {Auth} from "../services/auth";
import {UrlManager} from "../utils/url-manager";
import {CustomHttp} from "../services/custom-http";
import config from "../../config/config";
import {
  QuizAnswerCorrectType,
  QuizAnswersType,
  QuizQuestionAnswersType
} from "../types/quiz.type";
import {QueryParamsType} from "../types/query-params.type";
import {UserInfoType} from "../types/user-info.type";
import {DefaultResponseType} from "../types/default-response.type";

export class Answers {
  private quizAnswers: QuizAnswersType | null;
  private routeParams: QueryParamsType;
  private QuizAnswerCorrect: QuizAnswerCorrectType | null;

  constructor() {
    this.quizAnswers = null;
    this.routeParams = UrlManager.getQueryParams();
    this.QuizAnswerCorrect = null;

    this.init();
  }

  private async init(): Promise<void> {
    const userInfo: UserInfoType | null = Auth.getUserInfo();
    if (userInfo) {
      try {
        const result: DefaultResponseType | QuizAnswersType = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId);

        if (result) {
          if ((result as DefaultResponseType).error !== undefined) {
            throw new Error((result as DefaultResponseType).message);
          }

          this.quizAnswers = result as QuizAnswersType;
          console.log(this.quizAnswers);
          this.showTestTitle();
          this.showUserInfo();
          this.showCorrectAnswers();
        }

      } catch (error) {
        console.log(error);
        return;
      }
    }
  }

  private showCorrectAnswers(): void {
    const goBackElement: HTMLElement | null = document.getElementById('goback');
    if (goBackElement) {
      goBackElement.onclick = () => {
        location.href = '#/result?id=' + this.routeParams.id;
      }
    }

    if (!this.quizAnswers) return;

    if (this.quizAnswers.test.questions.length > 0) {
        const questions: HTMLElement | null = document.getElementById('questions');
        if (questions) {
          questions.innerHTML = '';
        }

        this.quizAnswers.test.questions.forEach((questionItem: QuizQuestionAnswersType, questionIndex: number) => {
          const question: HTMLElement | null = document.createElement('div');
          if (question) {
            question.className = 'test-question';
          }
          const questionTitle: HTMLElement | null = document.createElement('div');
          if (questionTitle) {
            questionTitle.className = 'test-question-title';
            questionTitle.innerHTML = `<span>Вопрос ${questionIndex + 1}:</span> ${questionItem.question}`;
          }


          const questionOptions: HTMLElement | null = document.createElement('div');
          if (questionOptions) {
            questionOptions.className = 'test-question-options';
          }

          question.appendChild(questionTitle);
          question.appendChild(questionOptions);

          if (questions) {
            questions.appendChild(question);
          }

          questionItem.answers.forEach((answerItem: QuizAnswerCorrectType) => {
            const optionElement: HTMLElement | null = document.createElement('div');
            if (optionElement) {
              optionElement.className = 'test-question-option';
              if (answerItem.hasOwnProperty('correct')) {
                optionElement.classList.add(answerItem.correct ? 'correct' : 'wrong');
              }
            }

            const answerElement: HTMLElement | null = document.createElement('div');
            if (answerElement) {
              answerElement.className = 'option-answer';
            }

            optionElement.appendChild(answerElement);
            optionElement.append(answerItem.answer);
            questionOptions.appendChild(optionElement);
          })
        })


      } else {
        location.href = '#/';
        return;
      }
    }

    private showTestTitle(): void{
      if(!this.quizAnswers) return;

      const preTitleElement = document.getElementById('pre-title');
      if(preTitleElement) {
        preTitleElement.innerText = this.quizAnswers.test.name;
      }
    }

    private showUserInfo(): void {
      const email: string | null  = localStorage.getItem('userEmail');
      const userInfo = Auth.getUserInfo();
      const useInfoElement: HTMLElement | null = document.getElementById('user-info');
      if(useInfoElement && userInfo && email){
        useInfoElement.innerText = userInfo.fullName + ', ' + email;
      }
    }
}