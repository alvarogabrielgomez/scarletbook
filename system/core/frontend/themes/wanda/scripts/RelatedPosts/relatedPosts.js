import Utils from "./utils.js";
const utils = new Utils();

class RelatedPosts {
    constructor() {
        this.initializad = false;
        this.actualPage = 0;
        this.lastPage = 0;
        this.limit = 9;
        this.distinct = 0;
        this.content = [],
        this.header = {};
        this.theme = '';
        this.busy = true;
    }

    init(config) {
        this.header = { text: config.headerText || 'Descubre', align: config.headerAlign || 'left'};
        this.theme = config.theme || 'white';
        this.distinct = parseInt(config.distinct) || 0;

        utils.loadLayout(this);
        this.showSpinner();
        this.getContent(0)
            .then((content) => {
                this.lastPage = parseInt(Math.round(content.total / this.limit) - 1); // Get the total of pages. -1 because starts in 0
                utils.loadCards(content);
                this.initializad = true;
                this.removeSpinner()
            });
    }

    getContent(page) {
        return Promise.resolve(
            fetch(`./api/articles?page=${page}&limit=${this.limit}&distinct=${this.distinct}`)
                .then(async (raw) => {
                    const data = await raw.json();
                    return data;
                })
        )
    }

    nextPage() {
        if (this.actualPage <= this.lastPage && !this.busy) {
            this.actualPage++;
            this.showSpinner();
            this.getContent(this.actualPage)
                .then((content) => {
                    utils.loadCards(content);
                    this.removeSpinner();
                });
        }
    }

    showSpinner() {
        this.busy = true;
        utils.showSpinner();
    }

    removeSpinner() {
        this.busy = false;
        utils.removeSpinner();
    }
}

window.relatedPosts = new RelatedPosts();