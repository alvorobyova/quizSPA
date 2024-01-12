import {Auth} from "../services/auth.js";
import {UrlManager} from "../utils/url-manager.js";
import {CustomHttp} from "../services/custom-http.js";
import config from "../../config/config.js";

export class Answers {

  constructor() {

    this.quiz = null;
    this.routeParams = UrlManager.getQueryParams();

    this.init();

  }

  async init() {
    const userInfo = Auth.getUserInfo();
    if (userInfo) {
      try {
        const result = await CustomHttp.request(config.host + '/tests/' + this.routeParams.id + '/result/details?userId=' + userInfo.userId);

        if (result) {
          if (result.error) {
            throw new Error(result.error);
          }

          this.quiz = result.test;
          console.log(this.quiz);
          console.log(this.quiz.questions);

          this.showTestTitle();
          this.showUserInfo();
          this.showCorrectAnswers();
        }

      } catch (error) {
        return console.log(error);
      }
    }
  }

  showCorrectAnswers() {
    document.getElementById('goback').onclick = () => {
      location.href = '#/result?id=' + this.routeParams.id;
    }
    if (this.quiz && this.quiz.questions.length > 0) {
      const questions = document.getElementById('questions');
      questions.innerHTML = '';

      this.quiz.questions.forEach((questionItem, questionIndex) => {
        const question = document.createElement('div');
        question.className = 'test-question';
        const questionTitle = document.createElement('div');
        questionTitle.className = 'test-question-title';
        questionTitle.innerHTML = `<span>Вопрос ${questionIndex + 1}:</span> ${questionItem.question}`;

        const questionOptions = document.createElement('div');
        questionOptions.className = 'test-question-options';
        question.appendChild(questionTitle);
        question.appendChild(questionOptions);
        questions.appendChild(question);

        questionItem.answers.forEach(answerItem => {
          const optionElement = document.createElement('div');
          optionElement.className = 'test-question-option';
          if (answerItem.hasOwnProperty('correct')) {
            optionElement.classList.add(answerItem.correct ? 'correct' : 'wrong');
          }
          const answerElement = document.createElement('div');
          answerElement.className = 'option-answer';
          optionElement.appendChild(answerElement);
          optionElement.append(answerItem.answer);
          questionOptions.appendChild(optionElement);
        })
      })

    } else {
      location.href = '#/';
    }
  }

  showTestTitle() {
    document.getElementById('pre-title').innerText = this.quiz.name;
  }

  showUserInfo() {
    const email = localStorage.getItem('userEmail');
    const userInfo = Auth.getUserInfo();
    document.getElementById('user-info').innerText = userInfo.fullName + ', ' + email;
  }
}