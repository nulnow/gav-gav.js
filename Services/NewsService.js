class NewsService {
    static getAllNews() {
        return [
            {
                id: 1,
                body: 'Hello world'
            },
            {
                id: 2,
                body: 'It\'s me'
            }
        ];
    }
}

module.exports = NewsService;