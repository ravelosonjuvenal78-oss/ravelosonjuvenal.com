/* =========================================================
   RAVELOSON Juvenal
   DIGITAL ARCHITECT
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initBackgroundCarousel();

    initScrollNavigation();

    initRevealAnimation();

    initHeaderScroll();

    initLanguage();

});


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (!menuToggle || !mainNav) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            mainNav.classList.toggle("active");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );


        menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

    });


    const navLinks =
        mainNav.querySelectorAll("a");


    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        });

    });


    document.addEventListener("click", event => {

        const clickedInsideMenu =
            mainNav.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            mainNav.classList.contains("active")
        ) {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });


    window.addEventListener("resize", () => {

        if (window.innerWidth > 950) {

            mainNav.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    });

}


/* =========================================================
   BACKGROUND CAROUSEL
========================================================= */

function initBackgroundCarousel() {

    const backgrounds =
        document.querySelectorAll(".hero-bg");

    const thumbnails =
        document.querySelectorAll(".thumb");


    if (!backgrounds.length || !thumbnails.length) {
        return;
    }


    let currentIndex = 0;

    let autoplay;


    function changeBackground(index) {

        if (
            index < 0 ||
            index >= backgrounds.length
        ) {
            return;
        }


        backgrounds.forEach(bg => {

            bg.classList.remove("active");

        });


        thumbnails.forEach(thumb => {

            thumb.classList.remove("active");

        });


        backgrounds[index].classList.add("active");

        thumbnails[index].classList.add("active");


        currentIndex = index;

    }


    function nextBackground() {

        const nextIndex =
            (currentIndex + 1) %
            backgrounds.length;

        changeBackground(nextIndex);

    }


    function startAutoplay() {

        clearInterval(autoplay);

        autoplay =
            setInterval(
                nextBackground,
                6000
            );

    }


    thumbnails.forEach((thumb, index) => {

        thumb.addEventListener("click", () => {

            changeBackground(index);

            startAutoplay();

        });

    });


    changeBackground(0);

    startAutoplay();

}


/* =========================================================
   ACTIVE NAVIGATION ON SCROLL
========================================================= */

function initScrollNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            "#mainNav a[href^='#']"
        );


    if (!sections.length || !navLinks.length) {
        return;
    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const id =
                        entry.target.getAttribute("id");


                    navLinks.forEach(link => {

                        link.classList.remove("active");


                        const href =
                            link.getAttribute("href");


                        if (
                            href === `#${id}`
                        ) {

                            link.classList.add(
                                "active"
                            );

                        }

                    });

                });

            },
            {
                rootMargin:
                    "-35% 0px -55% 0px",

                threshold: 0
            }
        );


    sections.forEach(section => {

        observer.observe(section);

    });

}


/* =========================================================
   REVEAL ANIMATION
========================================================= */

function initRevealAnimation() {

    const elements =
        document.querySelectorAll(".reveal");


    if (!elements.length) {
        return;
    }


    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        elements.forEach(element => {

            element.classList.add("visible");

        });

        return;

    }


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

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

                });

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(element => {

        observer.observe(element);

    });

}


/* =========================================================
   HEADER SCROLL EFFECT
========================================================= */

function initHeaderScroll() {

    const header =
        document.getElementById(
            "siteHeader"
        );


    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 30) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* =========================================================
   LANGUAGE SYSTEM
========================================================= */

const translations = {

    fr: {

        nav_home: "ACCUEIL",

        nav_expertise: "EXPERTISE",

        nav_tech: "TECH STACK",

        nav_solutions: "SOLUTIONS",

        nav_process: "PROCESS",

        nav_about: "À PROPOS",

        nav_contact: "CONTACT",

        download_cv: "TÉLÉCHARGER CV",

        hello: "Bonjour, je suis",

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

        nav_home: "HOME",

        nav_expertise: "EXPERTISE",

        nav_tech: "TECH STACK",

        nav_solutions: "SOLUTIONS",

        nav_process: "PROCESS",

        nav_about: "ABOUT",

        nav_contact: "CONTACT",

        download_cv: "DOWNLOAD CV",

        hello: "Hello, I am",

        hero_description:
            "I help businesses accelerate their digital transformation through innovative, high-performance and secure solutions.",

        projects:
            "DISCOVER MY PROJECTS",

        contact_me:
            "CONTACT ME",

        expertise_title:
            "EXPERTISE",

        expertise_sub:
            "Complete expertise to support your digital transformation."

    }

};


/* =========================================================
   SET LANGUAGE
========================================================= */

function setLanguage(language) {

    if (
        !translations[language]
    ) {
        return;
    }


    const elements =
        document.querySelectorAll(
            "[data-key]"
        );


    elements.forEach(element => {

        const key =
            element.getAttribute(
                "data-key"
            );


        if (
            translations[language][key]
        ) {

            element.textContent =
                translations[language][key];

        }

    });


    const frButton =
        document.getElementById(
            "btn-fr"
        );

    const enButton =
        document.getElementById(
            "btn-en"
        );


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


    document.documentElement.lang =
        language;


    localStorage.setItem(
        "raveloson-language",
        language
    );

}


/* =========================================================
   LOAD SAVED LANGUAGE
========================================================= */

function initLanguage() {

    const savedLanguage =
        localStorage.getItem(
            "raveloson-language"
        );


    if (
        savedLanguage === "en" ||
        savedLanguage === "fr"
    ) {

        setLanguage(
            savedLanguage
        );

    } else {

        setLanguage("fr");

    }

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (event.key !== "Escape") {
            return;
        }


        const menuToggle =
            document.getElementById(
                "menuToggle"
            );

        const mainNav =
            document.getElementById(
                "mainNav"
            );


        if (
            menuToggle &&
            mainNav &&
            mainNav.classList.contains("active")
        ) {

            mainNav.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.innerHTML =
                '<i class="fa-solid fa-bars"></i>';

        }

    }
);
