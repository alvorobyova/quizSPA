import {Router} from "./router.js";

// Router

// функция, которая будет срабатывать при открытии какой-либо страницы
class App {
    constructor() {

        // создаем новый экземпляр класса
        this.router = new Router();

        // здесь в прослушивателе должна быть функция, которая будет определять, на какой странице мы находимся
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this))
    /*=> {
            // this.router.openRoute();
        });*/

        // обработка события — смена url
        window.addEventListener('popstate', this.handleRouteChanging.bind(this))
    /*=> {
            // this.router.openRoute();
        });*/
    }

    // функция для улавливания смены url
    handleRouteChanging() {
        this.router.openRoute();
    }
}

// сразу создаем экземпляр класса, будет осуществлен вызов функции, описанной в конструкторе
(new App());