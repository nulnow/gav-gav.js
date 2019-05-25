class NewsService {
    static getAllNews() {
        return new Promise((resolve, reject) => {
            resolve([
                {
                    id: 1,
                    body: 'Hello world'
                },
                {
                    id: 2,
                    body: 'It\'s me'
                }
            ]);
        });
    }
}

module.exports = NewsService;