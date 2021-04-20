export default { 
    setBackgroundImage: function setBackgroundImage(image, newID, oldID) {
        
        const backgroundImage = document.querySelector('div.hero-section__background');
        var newPicture = document.createElement('picture');
        newPicture.id = `hero-image-${newID}`;
        newPicture.classList.add('animate__animated', 'animate__fadeIn', 'hero-section__background-image');
        newPicture.appendChild(image);
        // newPicture.innerHTML = `<img class="responsive-picture" src="${url}" alt="Awesome hero image">`;
        backgroundImage.appendChild(newPicture);
         
        // Is not the first image
        if (oldID !== null) {
            const oldPicture = document.getElementById(`hero-image-${oldID}`);
            newPicture.addEventListener('animationend', () => {
                backgroundImage.removeChild(oldPicture);
            });
        }

        return newPicture;
    },

    generateCard: function generateCard(cardContent) {
        let html = `
        <li id="carr-card-${cardContent.id}" class="carr-cards__card animate__animated animate__fadeInUp">
            <a href="#" class="carr-cards__card-body">
                <h3 class="carr-cards__category">${cardContent.category}</h3>
                <h2 class="carr-cards__title">${cardContent.title}</h2>
                <div class="carr-cards__timeout">
                    <div class="carr-cards__timeout-color"></div>
                </div>
            </a>
        </li>`;
        return html;
    },

    generateListOfCards: function generateListOfCards(listOfCardsContent) {
        let list = [];
        listOfCardsContent.forEach(cardContent => {
            list.push(this.generateCard(cardContent));
        });
        return list;
    },

    loadCards: function loadCards(listOfCards) {
        const heroSectionCards = document.querySelector('section.hero-section-cards-carr');
        let cards = '';
        listOfCards.forEach(card => {
            cards += card;
        });

        let html = `
        <div class="hero-section-cards-carr__content">
            <ul class="carr-cards__grid">
            ${cards}
            </ul>
        </div>`;

        heroSectionCards.innerHTML = html;
    },

    loadLayout: function loadLayout() {
        const heroSection = document.querySelector('section.hero-section-home-carr')
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
        `;
        heroSection.innerHTML = html;
    },


    loadHeroContent(content) {
        const category = document.querySelector('div.hero-section__content div.hero-section__header h3.hero-section__category');
        const title = document.querySelector('div.hero-section__content div.hero-section__header h1.hero-section__title');
        const ctaButton = document.querySelector('div.hero-section__content div.hero-section__header a.hero-section__cta');

        this.setBackgroundImage(content.image, content.id, null);
        category.textContent = content.category;
        category.classList.remove('animate__animated', 'animate__fadeOutDown');
        category.classList.add('animate__animated', 'animate__fadeInDown');
        title.textContent = content.title;
        title.classList.remove('animate__animated', 'animate__fadeOutDown');
        title.classList.add('animate__animated', 'animate__fadeInDown');
        ctaButton.setAttribute('href', content.articleUrl);
    },
    
    /**
    * Update the Hero Content with the new content
    * @param {object} content The new content with the new ID
    * @param {object} actualID The actual id (Old ID)
    */
    updateHeroContent(content, actualID) {

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
        //heroImage.addEventListener('animationend', () => {
            
            // heroImage.children[0].setAttribute('src', content.imageUrl);
            // heroImage.classList.remove('animate__animated', 'animate__fadeOut');
            // heroImage.classList.add('animate__animated', 'animate__fadeIn');
        //});
    },

    preloadImages: function preloadImages() {
        // console.log('preload start');
        return new Promise(async (resolve, reject) => {
            for (let i = 0; i < arguments.length; i++) {
                    this.content[i].image = new Image();
                    this.content[i].image.src = arguments[i].imageUrl;
                    this.content[i].image.classList.add('responsive-picture');
            }
            // console.log('preload end');
            resolve();
        });
    },

    activateProgressBar: function activateProgressBar() {
        const progressbar = document.querySelector('');
    },

    carrouselHandler: function carrouselHandler(utils) {
        let _content = this.content;
        let nextID;
        if (this.actualID < this.limit) {
            nextID = this.actualID + 1;
        } else {
            // Reset
            nextID = 1;
        }

        _content = _content.find(x => x.id === parseInt(nextID))
        utils.updateHeroContent(_content, this.actualID);

        this.actualID = nextID;
    }
}; 