import {Router} from "./router";

class App {

    private router: Router;
    constructor() {

        this.router = new Router();
        window.addEventListener('DOMContentLoaded', this.handleRouteChanging.bind(this))

        // обработка события — смена url
        window.addEventListener('popstate', this.handleRouteChanging.bind(this))
    }

    // функция для улавливания смены url
    private handleRouteChanging(): void {
        this.router.openRoute();
    }
}

(new App());