class LangService {
    constructor(app) {
        this.app = app;
    }
    get(lang, key) {
        if (this.app.config.acceptedLanguages && this.app.config.acceptedLanguages.find(l => l === lang))
            return require(`../resources/lang/${lang}.js`)[key];
    }
    all() {

    }
}

module.exports = LangService;