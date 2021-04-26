import Utils from "./utils.js";
const utils = new Utils();

class HeroSectionCarousel {
    constructor() {
        this.initializad = false;
        this.actualID = 1;
        this.limit = 1;
        this.timeShowing = 7000; // MS
        this.content = [];
        this.mediaQuerys = [];
        this.work;
    }

    init() {
        let context = this;
        this.getContent().then(_ => this.preloadImages()
        .then((_) => {
            this.limit = this.content.length;
            this.setMediaQuerys();
            utils.loadLayout();
            utils.loadCards(context);
            utils.loadHeroContent(context, 0);
            this.startCarousel();
        }));
        
        return this;
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
        this.work = setInterval(() => { 
            utils.carouselHandler(context)
                .then(nextID => {
                    // Update ID before handler ends
                    this.actualID = nextID;
                })
        }, this.timeShowing);

        this.initializad = true;
    }

    stopCarousel() {
        clearInterval(this.work);
    }

    setMediaQuerys() {
        const medias = [
            { name: 'mobile', screen: '(max-width: 599px)' }, 
            { name: 'tablet', screen: '(min-width: 600px)' }, 
            { name: 'desktop', screen: '(min-width: 1000px)' }
        ];
        medias.forEach((media) => {
            this.mediaQuerys[media.name] = window.matchMedia(media.screen);
            this.mediaQuerys[media.name].addListener((e) => this.handleMediaQueryChange(e, media.name));
            this.handleMediaQueryChange(this.mediaQuerys[media.name], media.name);
        });
    }

    handleMediaQueryChange(e, screen) {
        if (e.matches && (screen === 'mobile' || screen == 'tablet')) {
            // console.log('Mobile');
            if(this.initializad) {
                this.redrawCarousel();
            }
        }
    }

    redrawCarousel() {
        let context = this;
        this.stopCarousel();
        utils.loadLayout();
        utils.loadCards(context);
        utils.loadHeroContent(context, 0);
        this.startCarousel();
    }

    goToId(id) {
        let context = this;
        if (id !== this.actualID) {
            this.stopCarousel();
            utils.goToId(context, id).then(nextID => {
                this.actualID = nextID;
                this.startCarousel();
            });
        }
    }

    getContent() {
        return Promise.resolve(
            fetch('./api/getLastEachCategory')
                .then(async (raw) => {
                    const data = await raw.json();
                    this.content = data;
                })
        )
    }
}

const heroSectionCarousel = new HeroSectionCarousel();
window.heroSectionCarousel = heroSectionCarousel;
heroSectionCarousel.init();