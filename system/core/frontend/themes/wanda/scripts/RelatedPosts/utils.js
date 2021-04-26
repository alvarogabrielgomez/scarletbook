export default class Utils {
    createLoadMoreBtn() {
        const loadMoreBtn = document.createElement('a');
        loadMoreBtn.classList.add('excelsior-hero-button-xl', 'related-posts__morebtn', 'secondary-color');
        loadMoreBtn.innerText = "Ver más";
        loadMoreBtn.onclick = () => { relatedPosts.nextPage() };
        return loadMoreBtn;
    }

    loadLayout(context) {
        const section = document.querySelector('section.related-posts');
        const content = document.createElement('div');
        const h1Header = document.createElement('h1');
        const grid = document.createElement('ul');
        
        content.classList.add('related-posts__content');
        h1Header.classList.add('related-posts__header');
        grid.classList.add('related-posts__grid');
        // const loadMoreBtn = this.createLoadMoreBtn();
        // section.appendChild(loadMoreBtn);

        section.innerHTML = '';

        section.appendChild(content);
        content.append(
            h1Header,
            grid
        );
        
        h1Header.innerText = context.header.text;
        h1Header.classList.add(context.header.align);

        section.classList.add(context.theme)
    }

    generateCard(content) {
        const newCard = document.createElement('li');
        const cardBody = document.createElement('a');
        const mediaWrapper = document.createElement('div');
        const heroImage = new Image();
        const cardContent = document.createElement('div');
        const cardTitle = document.createElement('h1');
        const cardDesc = document.createElement('p');
        const cardCategory = document.createElement('span');
        const readMoreLink = document.createElement('span');

        newCard.classList.add('related-card');
        cardBody.classList.add('related-card__body');
        cardBody.setAttribute('href', `./${content.slug}`)
        mediaWrapper.classList.add('related-card__media-wrapper');
        heroImage.src = content.heroImage
        heroImage.setAttribute('loading', 'lazy');
        cardContent.classList.add('related-card__content');
        cardCategory.classList.add('related-card__category')
        readMoreLink.innerText = "Leer más >"
        readMoreLink.classList.add('related-card__readmore');


        newCard.appendChild(cardBody);
        cardBody.append(
            mediaWrapper,
            cardContent
        )
        mediaWrapper.appendChild(heroImage);
        cardContent.append(
            cardCategory,
            cardTitle,
            cardDesc,
            readMoreLink
        );

        cardTitle.innerText = content.title;
        cardDesc.innerText = content.description
        cardCategory.innerText = content.category

        return newCard;
    }

    generateListOfCards(content) {
        let list = [];
        const listOfCardsContent = content.results;
        listOfCardsContent.forEach(cardContent => {
            list.push(this.generateCard(cardContent));
        });
        return list;
    }
    
    loadCards(content) {
        const grid = document.querySelector('section.related-posts div.related-posts__content ul.related-posts__grid');
        const listOfCards = this.generateListOfCards(content);

        listOfCards.forEach((card) => {
            grid.appendChild(card);
        });
    }

    showSpinner() {
        const section = document.querySelector('section.related-posts');
        const loadMoreBtn = document.querySelector('a.excelsior-hero-button-xl.related-posts__morebtn');
        const spinner = document.createElement('div');
        spinner.classList.add('spinner-ripple-container', 'static');
        spinner.innerHTML = `
        <div class="spinner-ripple">
        <div></div><div></div>
        </div>`;

        if(loadMoreBtn) { section.removeChild(loadMoreBtn); }
        section.appendChild(spinner);

    }

    removeSpinner() {
        const section = document.querySelector('section.related-posts');
        const spinner = document.querySelector('section.related-posts div.spinner-ripple-container');
        const loadMoreBtn = this.createLoadMoreBtn();
        section.removeChild(spinner);
        section.appendChild(loadMoreBtn);
    }
}