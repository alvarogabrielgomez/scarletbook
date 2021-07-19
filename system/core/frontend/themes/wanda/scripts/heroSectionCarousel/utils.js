export default class Utils {
    setBackgroundImage(image, newID, oldID) {
        
        const backgroundImage = document.querySelector('div.hero-section__background');
        var newPicture = document.createElement('picture');
        newPicture.setAttribute('image-id', newID);
        newPicture.classList.add('animate__animated', 'animate__fadeIn', 'hero-section__background-image');
        newPicture.appendChild(image);
        // newPicture.innerHTML = `<img class="responsive-picture" src="${url}" alt="Awesome hero image">`;
        backgroundImage.appendChild(newPicture);
         
        // Is not the first image
        if (oldID !== null) {
            const oldPicture = document.querySelectorAll(`[image-id="${oldID}"]`);
            setTimeout(() => {
                oldPicture.forEach((item) => {
                    backgroundImage.removeChild(item);
                });
            }, 600);
        }

        return newPicture;
    }

    generateCard(context, cardContent, index) {
        const newCard = document.createElement('li');
        newCard.setAttribute('card-id', index);
        newCard.classList.add('carr-cards__card', 'animate__animated', 'animate__fadeInUp');

        const newCardBody = document.createElement('a');
        newCardBody.setAttribute('href', '#');
        newCardBody.onclick = () => heroSectionCarousel.goToId(index);
        newCardBody.classList.add('carr-cards__card-body');
        newCardBody.innerHTML = `
        <h3 class="carr-cards__category">${cardContent.category}</h3>
        <h2 class="carr-cards__title">${cardContent.title}</h2>
        `;

        newCard.appendChild(newCardBody);

        return newCard;
    }

    generateListOfCards(context) {
        let list = [];
        const listOfCardsContent = context.content;
        listOfCardsContent.forEach((cardContent, index) => {
            list.push(this.generateCard(context, cardContent, index));
        });
        return list;
    }

    loadCards(context) {
        const heroSectionCards = document.querySelector('div.hero-section-home-carr__cards-container');
        heroSectionCards.innerHTML = "";
        
        const heroSectionCardsCarrContent = document.createElement('div');
        heroSectionCardsCarrContent.classList.add('hero-section-home-carr__cards-content');

        const carrCardsTimeoutContainer = document.createElement('div');
        carrCardsTimeoutContainer.classList.add('carr-cards__timeout-container');
        
        // StateBar
        context.content.forEach((item, index) => {
            const carrCardsTimeout = document.createElement('div');
            carrCardsTimeout.classList.add('carr-cards__timeout');
            carrCardsTimeout.setAttribute('card-id', index);
            carrCardsTimeoutContainer.appendChild(carrCardsTimeout);
        });

        heroSectionCardsCarrContent.appendChild(carrCardsTimeoutContainer);


        // Actual cards
        if (!context.mediaQuerys.mobile.matches) {
            const listOfCards = this.generateListOfCards(context)
            const carrCardsGrid = document.createElement('ul');
            carrCardsGrid.classList.add('carr-cards__grid');
            
            listOfCards.forEach((card) => {
                carrCardsGrid.appendChild(card);
            });
            heroSectionCardsCarrContent.appendChild(carrCardsGrid);
        }

        heroSectionCards.appendChild(heroSectionCardsCarrContent);
    }

    loadLayout(context) {
        const heroSection = document.querySelector('section.hero-section-home-carr')
        heroSection.innerHTML = "";
        let html = `
        <div class="hero-section__background-frontlight animate__animated animate__fadeIn"></div>
        <div class="carr-mobile-controls__container">
            <div class="carr-mobile-controls__back">
            </div>
            <div class="carr-mobile-controls__next">
            </div>
        </div>
        <div class="hero-section__background">
        </div>
        <div class="hero-section__content">
            <div class="hero-section__header">
                <h3 class="hero-section__category animate__animated animate__fadeInDown"></h3>
                <h1 class="hero-section__title animate__animated animate__fadeInDown"></h1>
            </div>
        </div>
        <div class="hero-section__button">
            <a href="#" class="hero-section__cta excelsior-hero-button-xl animate__animated animate__fadeInUp">Leer articulo</a>
        </div>
        <div class="hero-section-home-carr__cards-container">
        </div>
        `;
        heroSection.innerHTML = html;

        const nextButton = document.querySelector('section.hero-section-home-carr div.carr-mobile-controls__container div.carr-mobile-controls__next');
        const prevButton = document.querySelector('section.hero-section-home-carr div.carr-mobile-controls__container div.carr-mobile-controls__back');

        nextButton.onclick = () => this.nextCard(context);
        prevButton.onclick = () => this.prevCard(context);
    }

    loadHeroContent(context, id) {
        const _content = context.content[id];

        const category = document.querySelector('div.hero-section__content div.hero-section__header h3.hero-section__category');
        const title = document.querySelector('div.hero-section__content div.hero-section__header h1.hero-section__title');
        const ctaButton = document.querySelector('div.hero-section__button a.hero-section__cta');
        const nextButton = document.querySelector('section.hero-section-home-carr div.carr-mobile-controls__container div.carr-mobile-controls__next');
        const prevButton = document.querySelector('section.hero-section-home-carr div.carr-mobile-controls__container div.carr-mobile-controls__back');



        this.setBackgroundImage(_content.image, id, null);
        category.textContent = _content.category;
        category.classList.remove('animate__animated', 'animate__fadeOutDown');
        category.classList.add('animate__animated', 'animate__fadeInDown');
        title.textContent = _content.title;
        title.classList.remove('animate__animated', 'animate__fadeOutDown');
        title.classList.add('animate__animated', 'animate__fadeInDown');
        ctaButton.setAttribute('href', _content.articleUrl);
        nextButton.onclick = () => this.nextCard(context);
        prevButton.onclick = () => this.prevCard(context);

        this.activateCard(context, id, null);
    }

    /**
    * Update the Hero Content with the new content
    * @param {object} context The Context
    * @param {object} nextID the next ID
    * @param {object} actualID The actual id (Old ID)
    */
    updateHeroContent(context, nextID, actualID) {
        try {

            const content = context.content[nextID];

            const category = document.querySelector('div.hero-section__content div.hero-section__header h3.hero-section__category');
            const title = document.querySelector('div.hero-section__content div.hero-section__header h1.hero-section__title');
            const heroImage = document.querySelector('section.hero-section-home-carr div.hero-section__background picture');
            const ctaButton = document.querySelector('div.hero-section__button a.hero-section__cta');
            const nextButton = document.querySelector('section.hero-section-home-carr div.carr-mobile-controls__container div.carr-mobile-controls__next');
            const prevButton = document.querySelector('section.hero-section-home-carr div.carr-mobile-controls__container div.carr-mobile-controls__back');
    
            // First Remove
    
            this.setBackgroundImage(content.image, nextID, actualID);
            category.classList.remove('animate__animated', 'animate__fadeInDown');
            category.classList.add('animate__animated', 'animate__fadeOutDown');
            title.classList.remove('animate__animated', 'animate__fadeInDown');
            title.classList.add('animate__animated', 'animate__fadeOutDown');
            // heroImage.classList.remove('animate__animated', 'animate__fadeIn');
            // heroImage.classList.add('animate__animated', 'animate__fadeOut');
        
            // Update while animation ends
            category.addEventListener('animationend', () => {
                category.textContent = content.category;
                category.classList.remove('animate__animated', 'animate__fadeOutDown');
                category.classList.add('animate__animated', 'animate__fadeInDown');
            });
            title.addEventListener('animationend', () => {
                title.textContent = content.title;
                title.classList.remove('animate__animated', 'animate__fadeOutDown');
                title.classList.add('animate__animated', 'animate__fadeInDown');
                ctaButton.setAttribute('href', content.articleUrl);
                nextButton.onclick = () => this.nextCard(context, true);
                prevButton.onclick = () => this.prevCard(context, true);
            });
        
        } catch (e) {
            console.error('Carousel Error', e.message);
            heroSectionCarousel.stopCarousel();
        }
    }

    preloadImages(context) {
        // console.log('preload start');
        return new Promise(async (resolve, reject) => {
            let _content = context.content;
            for (let i = 0; i < _content.length; i++) {
                _content[i].image = new Image();
                _content[i].image.src = _content[i].imageUrl;
                _content[i].image.classList.add('responsive-picture');
            }
            // console.log('preload end');
            resolve(_content);
        });
    }

    activateCard(context, newID, oldID) {
        let timeShowing = context.timeShowing;

        if(oldID !== null) {
            const progressbarOld = document.querySelector(`div.carr-cards__timeout-container div.carr-cards__timeout[card-id="${oldID}"]`);
            progressbarOld.innerHTML = "";
        }
        
        const progressbarNew = document.querySelector(`div.carr-cards__timeout-container div.carr-cards__timeout[card-id="${newID}"]`);
        progressbarNew.innerHTML = "";

        const color = document.createElement('div');
        color.classList.add('carr-cards__timeout-color');
        color.style.transition = `all ${timeShowing}ms linear 0s`;

        progressbarNew.appendChild(color);

        // Media Query
        if (!context.mediaQuerys.mobile.matches) {
            if(oldID !== null) {
                const cardOld = document.querySelector(`ul.carr-cards__grid li.carr-cards__card[card-id="${oldID}"] a.carr-cards__card-body`);
                cardOld.classList.remove('active');
            }
            const cardNew = document.querySelector(`ul.carr-cards__grid li.carr-cards__card[card-id="${newID}"] a.carr-cards__card-body`);
            cardNew.classList.add('active');
        }

        setTimeout(() => {
            color.classList.add('w-100');
        }, 100);
    }

    carouselHandler(context) {
        return this.nextCard(context);
    }


    nextCard(context) {
        if (context.content.length > 1) {
            return new Promise((resolve, reject) => {
                let _actualID = context.actualID
                let _limit = context.limit;
                let _nextID = _actualID < _limit ? _actualID + 1 : 0;

                heroSectionCarousel.goToId(_nextID).then(nextID => {
                    resolve(nextID);
                });
            
            });
        }
    }

    prevCard(context) {
        if (context.content.length > 1) {
            return new Promise((resolve, reject) => {
                let _actualID = context.actualID
                let prevID = _actualID > 0 ? _actualID - 1 : 0

                heroSectionCarousel.goToId(prevID).then(prevID => {
                    resolve(prevID);
                });
            
            });
        }
    }

    goToId(context, id) {
        return new Promise((resolve, reject) => {
            const nextID = parseInt(id);
            let _actualID = context.actualID
    
            this.updateHeroContent(context, nextID, _actualID);
            this.activateCard(context, nextID, _actualID);

            resolve(nextID);
        });
    }
}
