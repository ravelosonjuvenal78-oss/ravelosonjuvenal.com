```javascript
/* =========================================================
   RAVELOSON Juvenal
   DIGITAL ARCHITECT
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const nav = document.querySelector("header nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {
            const opened = nav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                opened ? "true" : "false"
            );

            menuToggle.innerHTML = opened
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        nav.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            });
        });
    }


    /* =====================================================
       HERO BACKGROUNDS
    ===================================================== */

    const backgrounds = [
        "assets/images/web-develloppeur.png",
        "assets/images/DATA SYSTEMS.png",
        "assets/images/IT INFRASTRUCTURE.png",
        "assets/images/DIGITAL TRANSFORMATION.png",
        "assets/images/web-man.png"
    ];

    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground) {

        /* Remove existing backgrounds */
        heroBackground.innerHTML = "";

        /* Create all 5 background layers */
        backgrounds.forEach((image, index) => {

            const layer = document.createElement("div");

            layer.className =
                "hero-bg" +
                (index === 0 ? " active" : "");

            layer.dataset.bgIndex = index;

            layer.style.backgroundImage =
                `url("${image}")`;

            heroBackground.appendChild(layer);
        });
    }


    /* =====================================================
       HERO THUMBNAILS
    ===================================================== */

    const thumbnails =
        document.querySelectorAll(".thumb");

    const heroLayers =
        document.querySelectorAll(".hero-bg");

    let currentBackground = 0;
    let backgroundTimer;


    function changeBackground(index) {

        if (!heroLayers.length) return;

        if (index < 0) {
            index = heroLayers.length - 1;
        }

        if (index >= heroLayers.length) {
            index = 0;
        }

        heroLayers.forEach(layer => {
            layer.classList.remove("active");
        });

        const selected =
            document.querySelector(
                `.hero-bg[data-bg-index="${index}"]`
            );

        if (selected) {
            selected.classList.add("active");
        }

        thumbnails.forEach(thumb => {
            thumb.classList.remove("active");
        });

        const activeThumb =
            document.querySelector(
                `.thumb[data-bg-index="${index}"]`
            );

        if (activeThumb) {
            activeThumb.classList.add("active");
        }

        currentBackground = index;
    }


    function startBackgroundSlider() {

        clearInterval(backgroundTimer);

        backgroundTimer = setInterval(() => {

            currentBackground++;

            if (
                currentBackground >=
                backgrounds.length
            ) {
                currentBackground = 0;
            }

            changeBackground(currentBackground);

        }, 7000);
    }


    thumbnails.forEach(thumb => {

        thumb.addEventListener("click", () => {

            const index =
                Number(
                    thumb.dataset.bgIndex
                );

            changeBackground(index);

            startBackgroundSlider();
        });

    });


    /* Start */
    if (heroLayers.length) {
        changeBackground(0);
        startBackgroundSlider();
    }


    /* =====================================================
       LANGUAGE
    ===================================================== */

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

            download_cv:
                "DOWNLOAD CV",

            hello:
                "Hello, I am",

            hero_description:
                "I help companies accelerate their digital transformation through innovative, high-performance and secure solutions.",

            projects:
                "DISCOVER MY PROJECTS",

            contact_me:
                "CONTACT ME",

            expertise_title:
                "EXPERTISE",

            expertise_sub:
                "Complete expertise dedicated to your digital transformation."
        }
    };


    window.setLanguage = function(language) {

        const dictionary =
            translations[language];

        if (!dictionary) return;

        document
            .querySelectorAll("[data-key]")
            .forEach(element => {

                const key =
                    element.dataset.key;

                if (
                    dictionary[key] !== undefined
                ) {
                    element.textContent =
                        dictionary[key];
                }

            });


        document
            .querySelectorAll(".lang-btn")
            .forEach(button => {
                button.classList.remove("active");
            });


        const selected =
            document.getElementById(
                `btn-${language}`
            );

        if (selected) {
            selected.classList.add("active");
        }


        localStorage.setItem(
            "raveloson-language",
            language
        );
    };


    const savedLanguage =
        localStorage.getItem(
            "raveloson-language"
        );

    if (
        savedLanguage &&
        translations[savedLanguage]
    ) {
        window.setLanguage(savedLanguage);
    }


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            "header nav a"
        );


    function updateActiveNavigation() {

        let current = "";

        sections.forEach(section => {

            const top =
                section.offsetTop -
                150;

            const height =
                section.offsetHeight;

            if (
                window.scrollY >= top &&
                window.scrollY <
                top + height
            ) {
                current =
                    section.id;
            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );

            const target =
                link.getAttribute("href");

            if (
                target === `#${current}`
            ) {
                link.classList.add(
                    "active"
                );
            }

        });
    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver"
        in window
    ) {

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


        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add(
                "visible"
            );
        });

    }


    /* =====================================================
       IMAGE ERROR PROTECTION
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(img => {

            img.addEventListener(
                "error",
                () => {

                    img.style.display =
                        "none";

                }
            );

        });


    /* =====================================================
       PREVENT EMPTY CARD LINKS
    ===================================================== */

    document
        .querySelectorAll(
            'a[href="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {
                    event.preventDefault();
                }
            );

        });


    /* =====================================================
       YEAR
    ===================================================== */

    document
        .querySelectorAll(
            "[data-current-year]"
        )
        .forEach(element => {

            element.textContent =
                new Date().getFullYear();

        });

});
```
