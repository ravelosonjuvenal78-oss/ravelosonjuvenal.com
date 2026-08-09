/* =========================================================
   RAVELOSON Juvenal
   DIGITAL ARCHITECT
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const heroBackgrounds =
    document.querySelectorAll(".hero-bg");

const thumbnails =
    document.querySelectorAll(".thumb");

const menuToggle =
    document.getElementById("menuToggle");

const mainNav =
    document.getElementById("mainNav");

const navLinks =
    document.querySelectorAll("nav a");

const revealElements =
    document.querySelectorAll(".reveal");


/* =========================================================
   HERO BACKGROUND CAROUSEL
========================================================= */

let currentBackground = 0;

let backgroundTimer;


function changeBackground(index) {

    if (!heroBackgrounds.length) {
        return;
    }


    if (
        index < 0 ||
        index >= heroBackgrounds.length
    ) {
        return;
    }


    heroBackgrounds.forEach(
        (background, i) => {

            background.classList.toggle(
                "active",
                i === index
            );

        }
    );


    thumbnails.forEach(
        (thumbnail, i) => {

            thumbnail.classList.toggle(
                "active",
                i === index
            );

        }
    );


    currentBackground = index;
}


/* =========================================================
   AUTOMATIC BACKGROUND
========================================================= */

function startBackgroundCarousel() {

    clearInterval(backgroundTimer);


    backgroundTimer = setInterval(
        () => {

            let next =
                currentBackground + 1;


            if (
                next >= heroBackgrounds.length
            ) {
                next = 0;
            }


            changeBackground(next);

        },
        6000
    );
}


/* =========================================================
   THUMBNAIL CLICK
========================================================= */

thumbnails.forEach(
    thumbnail => {

        thumbnail.addEventListener(
            "click",
            () => {

                const index =
                    Number(
                        thumbnail.dataset.bgIndex
                    );


                changeBackground(index);

                startBackgroundCarousel();

            }
        );

    }
);


/* =========================================================
   START HERO CAROUSEL
========================================================= */

if (heroBackgrounds.length > 1) {

    changeBackground(0);

    startBackgroundCarousel();

}


/* =========================================================
   MOBILE MENU
========================================================= */

if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                mainNav.classList.toggle("active");


            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.className =
                    isOpen
                        ? "fa-solid fa-xmark"
                        : "fa-solid fa-bars";

            }

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU AFTER CLICK
========================================================= */

navLinks.forEach(
    link => {

        link.addEventListener(
            "click",
            () => {

                if (!mainNav) {
                    return;
                }


                mainNav.classList.remove(
                    "active"
                );


                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );


                    const icon =
                        menuToggle.querySelector("i");


                    if (icon) {

                        icon.className =
                            "fa-solid fa-bars";

                    }

                }

            }
        );

    }
);


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY +
        window.innerHeight * .35;


    let currentSection = "";


    sections.forEach(
        section => {

            const top =
                section.offsetTop;

            const height =
                section.offsetHeight;


            if (
                scrollPosition >= top &&
                scrollPosition < top + height
            ) {

                currentSection =
                    section.id;

            }

        }
    );


    navLinks.forEach(
        link => {

            const target =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                target ===
                `#${currentSection}`
            );

        }
    );

}


/* =========================================================
   SCROLL EVENT
========================================================= */

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


updateActiveNavigation();


/* =========================================================
   REVEAL ANIMATION
========================================================= */

if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        element => {

            observer.observe(element);

        }
    );

} else {

    revealElements.forEach(
        element => {

            element.classList.add(
                "visible"
            );

        }
    );

}


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

const translations = {

    fr: {

        nav_home:
            "ACCUEIL",

        nav_expertise:
            "EXPERTISE",

        nav_tech:
            "TECH STACK",

        nav_solutions:
            "SOLUTIONS",

        nav_process:
            "PROCESS",

        nav_about:
            "À PROPOS",

        nav_contact:
            "CONTACT",

        download_cv:
            "TÉLÉCHARGER CV",

        hello:
            "Bonjour, je suis",

        hero_description:
            "J'accompagne les entreprises dans leur transformation numérique grâce à des solutions innovantes, performantes et sécurisées.",

        projects:
            "DÉCOUVRIR MES PROJETS",

        contact_me:
            "ME CONTACTER",

        expertise_title:
            "EXPERTISE",

        expertise_sub:
            "Une expertise complète au service de votre transformation digitale."

    },


    en: {

        nav_home:
            "HOME",

        nav_expertise:
            "EXPERTISE",

        nav_tech:
            "TECH STACK",

        nav_solutions:
            "SOLUTIONS",

        nav_process:
            "PROCESS",

        nav_about:
            "ABOUT",

        nav_contact:
            "CONTACT",

        download_cv:
            "DOWNLOAD CV",

        hello:
            "Hello, I am",

        hero_description:
            "I help businesses accelerate their digital transformation through innovative, high-performance and secure solutions.",

        projects:
            "DISCOVER MY PROJECTS",

        contact_me:
            "CONTACT ME",

        expertise_title:
            "EXPERTISE",

        expertise_sub:
            "Comprehensive expertise dedicated to your digital transformation."

    }

};


function setLanguage(language) {

    if (
        !translations[language]
    ) {
        return;
    }


    document.documentElement.lang =
        language;


    const elements =
        document.querySelectorAll(
            "[data-key]"
        );


    elements.forEach(
        element => {

            const key =
                element.dataset.key;


            if (
                translations[language][key]
            ) {

                element.textContent =
                    translations[language][key];

            }

        }
    );


    const frButton =
        document.getElementById("btn-fr");

    const enButton =
        document.getElementById("btn-en");


    if (frButton) {

        frButton.classList.toggle(
            "active",
            language === "fr"
        );

    }


    if (enButton) {

        enButton.classList.toggle(
            "active",
            language === "en"
        );

    }


    localStorage.setItem(
        "juvenal-language",
        language
    );

}


/* =========================================================
   LOAD SAVED LANGUAGE
========================================================= */

const savedLanguage =
    localStorage.getItem(
        "juvenal-language"
    );


if (
    savedLanguage &&
    translations[savedLanguage]
) {

    setLanguage(savedLanguage);

} else {

    setLanguage("fr");

}


/* =========================================================
   SMOOTH ANCHOR FALLBACK
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach(
        link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );


/* =========================================================
   PAGE READY
========================================================= */

document.documentElement.classList.add(
    "js-ready"
);


console.log(
    "RAVELOSON Juvenal | Digital Architect — System Online"
);