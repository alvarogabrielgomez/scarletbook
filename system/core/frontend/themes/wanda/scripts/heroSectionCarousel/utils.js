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

    // setBackgroundImage(image, newID, oldID) {
        
    //     const backgroundImage = document.querySelector('div.hero-section__background');
    //     var newPicture = document.createElement('picture');
    //     newPicture.setAttribute('image-id', newID);
    //     newPicture.classList.add('animate__animated', 'animate__fadeIn', 'hero-section__background-image');
    //     newPicture.appendChild(image);
    //     // newPicture.innerHTML = `<img class="responsive-picture" src="${url}" alt="Awesome hero image">`;
    //     backgroundImage.appendChild(newPicture);
         
    //     // Is not the first image
    //     if (oldID !== null) {
    //         const oldPicture = document.querySelectorAll(`[image-id="${oldID}"]`);
    //         setTimeout(() => {
    //             oldPicture.forEach((item) => {
    //                 backgroundImage.removeChild(item);
    //             });
    //         }, 600);
    //         // newPicture.addEventListener('animationend', () => {
    //         // });
    //     }

    //     return newPicture;
    // }

    generateCard(context, cardContent) {
        const newCard = document.createElement('li');
        newCard.setAttribute('card-id', cardContent.id);
        newCard.classList.add('carr-cards__card', 'animate__animated', 'animate__fadeInUp');

        const newCardBody = document.createElement('a');
        newCardBody.setAttribute('href', '#');
        newCardBody.onclick = () => heroSectionCarousel.goToId(cardContent.id);
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
        listOfCardsContent.forEach(cardContent => {
            list.push(this.generateCard(context, cardContent));
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
        context.content.forEach((item) => {
            const carrCardsTimeout = document.createElement('div');
            carrCardsTimeout.classList.add('carr-cards__timeout');
            carrCardsTimeout.setAttribute('card-id', item.id);
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

    loadLayout() {
        const heroSection = document.querySelector('section.hero-section-home-carr')
        heroSection.innerHTML = "";
        let html = `
        <div class="hero-section__background-frontlight animate__animated animate__fadeIn"></div>
        <div class="hero-section__background">
        </div>
        <div class="hero-section__content">
            <div class="hero-section__header">
                <h3 class="hero-section__category animate__animated animate__fadeInDown"></h3>
                <h1 class="hero-section__title animate__animated animate__fadeInDown"></h1>
                <a href="#" class="hero-section__cta excelsior-hero-button-xl animate__animated animate__fadeInUp">Leer articulo</a>
            </div>
        </div>
        <div class="hero-section-home-carr__cards-container">
        </div>
        `;
        heroSection.innerHTML = html;
    }

    loadHeroContent(context, id) {
        const _content = context.content[id];

        const category = document.querySelector('div.hero-section__content div.hero-section__header h3.hero-section__category');
        const title = document.querySelector('div.hero-section__content div.hero-section__header h1.hero-section__title');
        const ctaButton = document.querySelector('div.hero-section__content div.hero-section__header a.hero-section__cta');

        this.setBackgroundImage(_content.image, _content.id, null);
        category.textContent = _content.category;
        category.classList.remove('animate__animated', 'animate__fadeOutDown');
        category.classList.add('animate__animated', 'animate__fadeInDown');
        title.textContent = _content.title;
        title.classList.remove('animate__animated', 'animate__fadeOutDown');
        title.classList.add('animate__animated', 'animate__fadeInDown');
        ctaButton.setAttribute('href', _content.articleUrl);

        this.activateCard(context, _content.id, null);
    }

    /**
    * Update the Hero Content with the new content
    * @param {object} content The new content with the new ID
    * @param {object} actualID The actual id (Old ID)
    */
    updateHeroContent(content, actualID) {
        try {

            const category = document.querySelector('div.hero-section__content div.hero-section__header h3.hero-section__category');
            const title = document.querySelector('div.hero-section__content div.hero-section__header h1.hero-section__title');
            const heroImage = document.querySelector('section.hero-section-home-carr div.hero-section__background picture');
            const ctaButton = document.querySelector('div.hero-section__content div.hero-section__header a.hero-section__cta');
    
            // First Remove
    
            this.setBackgroundImage(content.image, content.id, actualID);
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
        return new Promise((resolve, reject) => {
            let _content = context.content;
            let _actualID = context.actualID
            let _limit = context.limit;
            let nextID;

            nextID = _actualID < _limit ? _actualID + 1 : 1;
            _content = _content.find(x => parseInt(x.id) === parseInt(nextID));

            this.updateHeroContent(_content, _actualID);
            this.activateCard(context, _content.id, _actualID);
        
            resolve(nextID);
        });
    }

    goToId(context, id) {
        return new Promise((resolve, reject) => {
            const nextID = id;
            let _actualID = context.actualID
    
            const _content = context.content.find(x => parseInt(x.id) === parseInt(id));
            this.updateHeroContent(_content, _actualID);
            this.activateCard(context, _content.id, _actualID);

            resolve(nextID);
        });
    }
}
