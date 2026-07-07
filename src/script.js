const nameEl = document.querySelector(".name");
const header = document.querySelector(".header");
const mainPage = document.querySelector(".main-page");
let lastScroll = 0;

function updateHeaderSpacing() {
    const headerHeight = header.offsetHeight;
    mainPage.style.paddingTop = `${headerHeight}px`;
}
updateHeaderSpacing();

window.addEventListener("scroll", () => {
    if (Date.now() - lastScroll > 50) {
        const scrollTop = window.scrollY;

        if (scrollTop > 50) {
            header.classList.add("scrolled");
            nameEl.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
            nameEl.classList.remove("scrolled");
        }
        updateHeaderSpacing();
        lastScroll = Date.now();
    }
});

window.addEventListener("resize", updateHeaderSpacing);

const lightbox = document.getElementById("lightbox");
const currentImg = document.getElementById("lightbox-img-current");
const nextImg = document.getElementById("lightbox-img-next");
const lightboxCaption = document.getElementById("lightbox-caption");
const closeBtn = document.getElementById("lightbox-close");
const leftArrow = document.querySelector(".lightbox-arrow.left");
const rightArrow = document.querySelector(".lightbox-arrow.right");

const items = document.querySelectorAll(".carousel-li");
const threeItems = document.querySelectorAll(".three-image-li");

let currentIndex = 0;
let lightboxMode = null; // "main" or "sub"

const imageSources = [
    "/images/Cat Bath.gif",
    "/images/Katsin.gif",
    "/images/Sheep Walk.gif",  
    "/images/Bird-Loop.gif",
    "/images/WalkCycle.gif",
];

const subImageSources = [
    "/images/Kiram_Ref.png",
    "/images/Guide_Ref.png",
    "/images/Ottie.png",
];

function openLightbox(index) {
    lightboxMode = "main";
    currentIndex = index;
    currentImg.src = imageSources[index];
    currentImg.style.opacity = 1;
    nextImg.style.opacity = 0;
    header.style.opacity = 0;
    lightbox.classList.add("visible");
}

function openSubLightbox(index) {
    lightboxMode = "sub";
    currentIndex = index;
    currentImg.style.opacity = 1;
    nextImg.style.opacity = 0;
    header.style.opacity = 0;
    lightbox.classList.add("visible");
    animateSlide(currentIndex, "next");
}

function animateSlide(newIndex, direction) {
    const sourceList = lightboxMode === "main" ? imageSources : subImageSources;
    nextImg.src = sourceList[newIndex];
    currentImg.className = "";
    nextImg.className = "";
    void currentImg.offsetWidth; 
    if (direction === "next") {
        currentImg.classList.add("slide-out-left");
        nextImg.classList.add("slide-in-right");
    } else {
        currentImg.classList.add("slide-out-right");
        nextImg.classList.add("slide-in-left");
    }
    setTimeout(() => {
        currentImg.src = nextImg.src;
        currentImg.className = "";
        nextImg.className = "";
    }, 500);

    currentIndex = newIndex;
}

const threeUl = document.querySelector(".three-image-ul");
let threeIndex = 0;

function slideThreeImages(direction) {
    const total = threeItems.length;
    if(direction === "next") threeIndex = (threeIndex + 1) % total;
    else if(direction === "prev") threeIndex = (threeIndex - 1 + total) % total;

    const offset = -threeIndex * 520; // 500px width + 20px gap
    threeUl.style.transform = `translateX(${offset}px)`;
}

document.querySelector(".three-image-section").addEventListener("click", (e) => {
    if(e.target.closest(".three-image-li"));
});


function showNext() {
    if (lightboxMode === "main") {
        const newIndex = (currentIndex + 1) % items.length;
        animateSlide(newIndex, "next");
    } else if (lightboxMode === "sub") {
        const newIndex = (currentIndex + 1) % subImageSources.length;
        animateSlide(newIndex, "next");
    }
}

function showPrev() {
    if (lightboxMode === "main") {
        const newIndex = (currentIndex - 1 + items.length) % items.length;
        animateSlide(newIndex, "prev");
    } else if (lightboxMode === "sub") {
        const newIndex = (currentIndex - 1 + subImageSources.length) % subImageSources.length;
        animateSlide(newIndex, "prev");
    }
}

rightArrow.addEventListener("click", showNext);
leftArrow.addEventListener("click", showPrev);

items.forEach((item, i) => item.addEventListener("click", () => openLightbox(i)));
threeItems.forEach((item, i) => item.addEventListener("click", () => openSubLightbox(i)));

closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("visible");
    header.style.opacity = 1;
});

lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove("visible");
        header.style.opacity = 1;
    }
});

document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("visible")) return;

    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "Escape") {
        lightbox.classList.remove("visible");
        header.style.opacity = 1;
    }
});


const windowImg = document.querySelector(".window-image");

document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 10;
    const y = (e.clientY / window.innerHeight) * 10;
    windowImg.style.transform = `scale(1.2) translateY(10%) translate(${-x}px, ${-y}px)`;
});

const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) scrollBtn.classList.add("show");
    else scrollBtn.classList.remove("show");
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
