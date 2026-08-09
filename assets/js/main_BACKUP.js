/* =========================================================
   RAVELOSON Juvenal
   DIGITAL ARCHITECT
   MAIN JAVASCRIPT
   MATCHED TO CURRENT HTML STRUCTURE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

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

            projects: "DÉCOUVRIR MES PROJETS",
            contact_me: "ME CONTACTER",

            expertise_title: "EXPERTISE",

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
                "I help businesses transform digitally through innovative, high-performance and secure solutions.",

            projects: "DISCOVER MY PROJECTS",
            contact_me: "CONTACT ME",

            expertise_title: "EXPERTISE",

            expertise_sub:
                "Comprehensive expertise dedicated to your digital transformation."
        }

    };


    let currentLanguage = "fr";


    window.setLanguage = function (language) {

        if (!translations[language]) {
            return;
        }

        currentLanguage = language;

        document.documentElement.lang = language;


        document
            .querySelectorAll("[data-key]")
            .forEach(element => {

                const key =
                    element.getAttribute("data-key");

                if (
                    translations[language][key] !== undefined
                ) {
                    element.textContent =
                        translations[language][key];
                }

            });


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


        try {
            localStorage.setItem(
                "juvenal-language",
                language
            );
        } catch (error) {
            // localStorage unavailable
        }

    };


    /* =====================================================
       RESTORE LANGUAGE
    ===================================================== */

    try {

        const savedLanguage =
            localStorage.getItem(
                "juvenal-language"
            );

        if (
            savedLanguage === "fr" ||
            savedLanguage === "en"
        ) {
            currentLanguage =
                savedLanguage;
        }

    } catch (error) {
        currentLanguage = "fr";
    }


    window.setLanguage(currentLanguage);


    /* =====================================================
       HERO BACKGROUND CAROUSEL
    ===================================================== */

    const heroBackgrounds =
        document.querySelectorAll(
            ".hero-bg"
        );

    const thumbnails =
        document.querySelectorAll(
            ".thumb"
        );


    const heroImages = [

        "assets/images/web-develloppeur.png",

        "assets/images/DATA SYSTEMS.png",

        "assets/images/IT INFRASTRUCTURE.png",

        "assets/images/DIGITAL TRANSFORMATION.png",

        "assets/images/web-man.png"

    ];


    let currentIndex = 0;

    let carouselTimer = null;

    const CAROUSEL_DELAY = 6500;


    /* =====================================================
       PRELOAD
    ===================================================== */

    heroImages.forEach(src => {

        const image =
            new Image();

        image.src = src;

    });


    /* =====================================================
       SET BACKGROUND
    ===================================================== */

    function setHeroBackground(index) {

        if (
            index < 0 ||
            index >= heroImages.length
        ) {
            return;
        }


        currentIndex = index;


        heroBackgrounds.forEach(
            (background, i) => {

                background.classList.toggle(
                    "active",
                    i === index
                );


                if (
                    i === index &&
                    !background.style.backgroundImage
                ) {

                    background.style.backgroundImage =
                        `url("${heroImages[index]}")`;

                }

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

    }


    /* =====================================================
       INITIALIZE ALL BACKGROUNDS
    ===================================================== */

    heroBackgrounds.forEach(
        (background, index) => {

            if (
                heroImages[index]
            ) {

                background.style.backgroundImage =
                    `url("${heroImages[index]}")`;

            }

        }
    );


    /* =====================================================
       NEXT
    ===================================================== */

    function nextBackground() {

        const nextIndex =
            (currentIndex + 1)
            % heroImages.length;

        setHeroBackground(
            nextIndex
        );

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousBackground() {

        const previousIndex =
            (
                currentIndex -
                1 +
                heroImages.length
            )
            %
            heroImages.length;

        setHeroBackground(
            previousIndex
        );

    }


    /* =====================================================
       AUTO PLAY
    ===================================================== */

    function startCarousel() {

        stopCarousel();

        carouselTimer =
            setInterval(
                nextBackground,
                CAROUSEL_DELAY
            );

    }


    function stopCarousel() {

        if (carouselTimer !== null) {

            clearInterval(
                carouselTimer
            );

            carouselTimer = null;

        }

    }


    /* =====================================================
       THUMBNAIL CLICK
    ===================================================== */

    thumbnails.forEach(
        thumbnail => {

            thumbnail.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            thumbnail.dataset.bgIndex
                        );


                    if (
                        Number.isNaN(index)
                    ) {
                        return;
                    }


                    setHeroBackground(
                        index
                    );

                    startCarousel();

                }
            );

        }
    );


    /* =====================================================
       KEYBOARD CONTROL
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "ArrowRight"
            ) {

                nextBackground();

                startCarousel();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousBackground();

                startCarousel();

            }

        }
    );


    /* =====================================================
       PAUSE ON HERO HOVER
    ===================================================== */

    const hero =
        document.querySelector(
            ".hero"
        );


    if (hero) {

        hero.addEventListener(
            "mouseenter",
            stopCarousel
        );


        hero.addEventListener(
            "mouseleave",
            startCarousel
        );

    }


    /* =====================================================
       START
    ===================================================== */

    setHeroBackground(0);

    startCarousel();


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            "section, .card-expertise, .tech-card, .solution-card, .step-card, .contact-terminal"
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
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

                                revealObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.10
                }
            );


        revealElements.forEach(
            element => {

                revealObserver.observe(
                    element
                );

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


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navLinks =
        document.querySelectorAll(
            "nav a[href^='#']"
        );


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver"
        in window
    ) {

        const navObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            const id =
                                entry.target.id;


                            navLinks.forEach(
                                link => {

                                    const href =
                                        link.getAttribute(
                                            "href"
                                        );


                                    link.classList.toggle(
                                        "active",
                                        href ===
                                        `#${id}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-25% 0px -60% 0px",

                    threshold: 0
                }
            );


        sections.forEach(
            section => {

                navObserver.observe(
                    section
                );

            }
        );

    }


    /* =====================================================
       SMOOTH ANCHOR
    ===================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(
            link => {

                link.addEventListener(
                    "click",
                    event => {

                        const targetId =
                            link.getAttribute(
                                "href"
                            );


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


                        const header =
                            document.querySelector(
                                "header, .navbar"
                            );


                        const offset =
                            header
                                ? header.offsetHeight
                                : 76;


                        const position =
                            target.getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            offset;


                        window.scrollTo({

                            top:
                                position,

                            behavior:
                                "smooth"

                        });


                        /* Close mobile nav */

                        const nav =
                            document.querySelector(
                                "nav"
                            );


                        if (nav) {
                            nav.classList.remove(
                                "active"
                            );
                        }

                    }
                );

            }
        );


    /* =====================================================
       MOBILE NAV — OPTIONAL
       Supports a future .menu-toggle
    ===================================================== */

    const menuToggle =
        document.querySelector(
            ".menu-toggle"
        );


    const navigation =
        document.querySelector(
            "nav"
        );


    if (
        menuToggle &&
        navigation
    ) {

        menuToggle.addEventListener(
            "click",
            () => {

                navigation.classList.toggle(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       ESC CLOSE MOBILE MENU
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                if (navigation) {

                    navigation.classList.remove(
                        "active"
                    );

                }

            }

        }
    );

});