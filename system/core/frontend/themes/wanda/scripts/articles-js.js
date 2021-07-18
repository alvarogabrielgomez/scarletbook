const header = document.querySelector('#header');
const heroSection = document.querySelector(".hero-section");
const progressBarContainer = document.querySelector(".read-progress-container");
const progressBar = document.querySelector('#blog-progress-bar');
const content = document.querySelector('article.main-section__article');

let headerFixed = false;

function scrollHandler() {

    let scroll = document.documentElement.scrollTop;
    let height = content.scrollHeight - document.documentElement.clientHeight;
    let percentage = (scroll / height) * 100;
    
    const heroActualSize = heroSection.clientHeight;
    
    progressBar.value = percentage;
    
    if (scroll > heroActualSize && !headerFixed) {
        headerFixed = true;
        header.classList.remove("header-transparent");
        header.classList.add("header-fixed");
        progressBarContainer.classList.add("show");

    } else if (scroll <= heroActualSize && headerFixed) {
        headerFixed = false;
        header.classList.remove("header-fixed");
        header.classList.add('header-transparent');
        progressBarContainer.classList.remove("show");
    }
}


window.addEventListener('scroll', scrollHandler);