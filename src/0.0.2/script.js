window.space360 = {
    visible: false
}

const linkEl = document.createElement('link');
linkEl.rel = "stylesheet";
linkEl.href = "https://cdn.jsdelivr.net/gh/Ferri0/kuula-integration@main/src/0.0.2/index.css";

document.head.appendChild(linkEl);

const container = document.createElement('div');
container.classList.add('space360_container');

document.body.appendChild(container);

const getMarkup = (tourId) => {
    return `
        <div class="space360_wrapper">
            <div class="space360_header">
                <a href="https://360world.space/" target="_blank">
                    <div class="space360_logo"></div>
                </a>
                <div class="space360_closeBtn">
                </div>
            </div>
            <div class="space360_innerWrapper">
                <div class="space360_iframeWrapper">
                    <iframe src="https://kuula.co/share/${tourId}" allowfullscreen="true"/>
                </div>
            </div>
        </div>
    `
}

const onKeyDown = (e) => {
    if (e.key === "Escape") {
        handleHideTour();
    }
}

let toggleTimeout = null;

const handleShowTour = (tourId) => {
    if (toggleTimeout) {
        clearTimeout(toggleTimeout);
        toggleTimeout = null;
    }

    container.classList.add('space360_isTourVisible');
    container.innerHTML = getMarkup(tourId);

    const tourWrapperEl = document.querySelector('.space360_wrapper');
    tourWrapperEl.addEventListener('click', handleHideTour);

    const headerEl = document.querySelector('.space360_header');
    headerEl.addEventListener('click', e => e.stopPropagation());

    const closeBtnEl = document.querySelector('.space360_closeBtn');
    closeBtnEl.addEventListener('click', handleHideTour);

    document.addEventListener('keydown', onKeyDown);
    window.space360.visible = true;
}

const handleHideTour = () => {
    container.classList.remove('space360_isTourVisible');

    toggleTimeout = setTimeout(() => {
        container.innerHTML = "";
    }, 300)

    document.removeEventListener('keydown', onKeyDown);
    window.space360.visible = false;
}

const tourTriggers = document.querySelectorAll(".space360_trigger");

tourTriggers.forEach(el => {
    el.addEventListener('click', (e) => {
        const triggerEl = e.target;
        const tourId = triggerEl.dataset.tourId;

        if (window.space360.visible) {
            handleHideTour();
        } else {
            handleShowTour(tourId);
        }
    })
});
