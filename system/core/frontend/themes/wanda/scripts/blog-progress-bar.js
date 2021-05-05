const progressBar = document.querySelector('#blog-progress-bar');
const content = document.querySelector('article.main-section__article');

function scrollHandler() {
    let scroll = document.documentElement.scrollTop;
    let height = content.scrollHeight - document.documentElement.clientHeight;

    let percentage = (scroll / height) * 100;

    progressBar.value = percentage;
    // console.log(percentage);
}

window.addEventListener('scroll', scrollHandler);