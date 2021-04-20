import utils from "./utils.js";

const content = [
    { id: 1, category: 'Category 1', title: 'Lorem ipsum dolor sit amet 1', imageUrl: './public/img/stock1.jpg', articleUrl: './elguevo1'},
    { id: 2, category: 'Category 2', title: 'Lorem ipsum dolor sit amet 2', imageUrl: './public/img/stock2.jpg', articleUrl: './elguevo2'},
    { id: 3, category: 'Category 3', title: 'Lorem ipsum dolor sit amet 3', imageUrl: './public/img/stock3.jpg', articleUrl: './elguevo3'},
];

class HeroSectionCarrousel {
    constructor(content) {
        this.actualID = 1;
        this.limit = 1;
        this.timeShowing = 10000;
        this.content = content;
        this.images = []
    }

    async init() {
        // console.log('init');
        // console.log('before preload');
        await this.preloadImages();
        // console.log('after preload');
        this.limit = parseInt(this.content.length);
        utils.loadLayout();
        utils.loadCards(utils.generateListOfCards(this.content));
        utils.loadHeroContent(this.content[0]);
        setInterval(utils.carrouselHandler.bind(this, utils), this.timeShowing);
        // console.log('end'); 
    }

    preloadImages() {
        return new Promise(async (resolve, reject) => {
            // let imagesUrl = [];
            // imagesUrl = content.map((item) => {
            //     return {id: item.id, url: item.imageUrl };
            // });
    
            await utils.preloadImages.bind(this, ...content)();
            resolve();
        })
    }
}

const heroSectionCarrousel = new HeroSectionCarrousel(content);
heroSectionCarrousel.init();