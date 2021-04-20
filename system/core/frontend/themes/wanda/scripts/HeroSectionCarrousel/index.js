import Utils from "./utils.js";

const utils = new Utils();

const content = [
    { id: 1, category: 'Category 1', title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores perspiciati 1', imageUrl: './public/img/stock1.jpg', articleUrl: './elguevo1'},
    { id: 2, category: 'Category 2', title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores perspiciati  2', imageUrl: './public/img/stock2.jpg', articleUrl: './elguevo2'},
    { id: 3, category: 'Category 3', title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores perspiciati  3', imageUrl: './public/img/stock3.jpg', articleUrl: './elguevo3'},
];

class HeroSectioncarousel {
    constructor(content) {
        this.actualID = 1;
        this.limit = content.length;
        this.timeShowing = 4500; // MS
        this.content = content;
        this.mediaQuerys = [];
        this.test = 1;
    }

    async init() {
        // console.log('init');
        // console.log('before preload');
        await this.preloadImages();
        this.setMediaQuerys();
        // console.log('after preload');
        utils.loadLayout();
        utils.loadCards(utils.generateListOfCards(this.content));
        utils.loadHeroContent(this.content[0], this.timeShowing);
        this.startCarousel();
        // console.log('end'); 
    }

    preloadImages() {
        let context = this;
        return Promise.resolve(
            utils.preloadImages(context)
                .then(updatedContent => {
                    this.content = updatedContent;
                })
        );
    }

    startCarousel() {
        let context = this;
        setInterval(() => { 
            utils.carouselHandler(context)
                .then(nextID => {
                    // Update ID before handler ends
                    this.actualID = nextID;
                })
        }, this.timeShowing);
    }

    setMediaQuerys() {
        this.mediaQuerys.mobile = window.matchMedia('(max-width: 599px)');
        this.mediaQuerys.tablet = window.matchMedia('(min-width: 600px)');
        this.mediaQuerys.desktop = window.matchMedia('(min-width: 1000px)');

        this.mediaQuerys.mobile.addListener((e) => this.handleMediaQueryChange(e, 'mobile'));
        this.mediaQuerys.tablet.addListener((e) => this.handleMediaQueryChange(e, 'tablet'));
        this.mediaQuerys.desktop.addListener((e) => this.handleMediaQueryChange(e, 'desktop'));

        this.handleMediaQueryChange(this.mediaQuerys.mobile, 'mobile');
        this.handleMediaQueryChange(this.mediaQuerys.tablet, 'tablet');
        this.handleMediaQueryChange(this.mediaQuerys.desktop, 'desktop');
    }

    handleMediaQueryChange(e, screen) {
        if (e.matches && screen === 'mobile') {
            console.log('Mobile');
        }
    }
}

const heroSectioncarousel = new HeroSectioncarousel(content);
heroSectioncarousel.init();