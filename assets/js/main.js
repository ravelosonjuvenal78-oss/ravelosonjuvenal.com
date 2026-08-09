/* =========================================================
   RAVELOSON Juvenal
   DIGITAL ARCHITECT
   MAIN JAVASCRIPT
   FINAL STABLE VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       YEAR
    ===================================================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle =
        document.getElementById("menuToggle");

    const nav =
        document.querySelector("nav");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            const active =
                nav.classList.toggle("active");

            menuToggle.setAttribute(
                "aria-expanded",
                String(active)
            );

        });


        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }


    /* =====================================================
       LANGUAGE
    ===================================================== */

    let currentLanguage = "fr";

    window.setLanguage = function (language) {

        if (
            language !== "fr" &&
            language !== "en"
        ) {
            return;
        }

        currentLanguage = language;

        document.documentElement.lang =
            language;


        document
            .querySelectorAll("[data-key]")
            .forEach(element => {

                const key =
                    element.getAttribute("data-key");

                if (
                    !window.translations ||
                    !window.translations[key]
                ) {
                    return;
                }

                const value =
                    window.translations[key][language];

                if (value !== undefined) {
                    element.textContent = value;
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
                "portfolioLanguage",
                language
            );

        } catch (error) {}

    };


    try {

        const savedLanguage =
            localStorage.getItem(
                "portfolioLanguage"
            );

        if (
            savedLanguage === "fr" ||
            savedLanguage === "en"
        ) {
            currentLanguage =
                savedLanguage;
        }

    } catch (error) {}

    window.setLanguage(currentLanguage);


    /* =====================================================
       HERO CAROUSEL
    ===================================================== */

    const hero =
        document.querySelector(".hero-container") ||
        document.querySelector(".hero");


    const heroBackgrounds =
        document.querySelectorAll(".hero-bg");


    const thumbnails =
        document.querySelectorAll(
            ".hero-thumbs-only .thumb, .side-thumbnails .thumb, .thumb"
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

    let isChanging = false;

    const CAROUSEL_DELAY = 6500;


    /* =====================================================
       PRELOAD
    ===================================================== */

    heroImages.forEach(src => {

        const image = new Image();

        image.src = src;

    });


    /* =====================================================
       PREPARE BACKGROUNDS
    ===================================================== */

    heroBackgrounds.forEach(
        (background, index) => {

            if (!heroImages[index]) {
                return;
            }

            background.style.backgroundImage =
                `url("${heroImages[index]}")`;

        }
    );


    /* =====================================================
       UPDATE HERO
    ===================================================== */

    function updateHero(index, animate = true) {

        if (
            !heroBackgrounds.length ||
            !heroImages.length
        ) {
            return;
        }


        if (
            index < 0 ||
            index >= heroImages.length
        ) {
            return;
        }


        if (
            isChanging &&
            animate
        ) {
            return;
        }


        if (
            index === currentIndex &&
            animate
        ) {
            return;
        }


        isChanging = true;


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

                const active =
                    i === index;

                thumbnail.classList.toggle(
                    "active",
                    active
                );

                thumbnail.setAttribute(
                    "aria-current",
                    active
                        ? "true"
                        : "false"
                );

            }
        );


        currentIndex = index;


        if (animate) {

            window.setTimeout(() => {

                isChanging = false;

            }, 700);

        } else {

            isChanging = false;

        }

    }


    /* =====================================================
       NEXT
    ===================================================== */

    function nextSlide() {

        if (heroImages.length <= 1) {
            return;
        }

        const nextIndex =
            (currentIndex + 1) %
            heroImages.length;

        updateHero(nextIndex);

    }


    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousSlide() {

        if (heroImages.length <= 1) {
            return;
        }

        const previousIndex =
            (
                currentIndex -
                1 +
                heroImages.length
            ) %
            heroImages.length;

        updateHero(previousIndex);

    }


    /* =====================================================
       AUTOPLAY
    ===================================================== */

    function startCarousel() {

        stopCarousel();

        if (heroImages.length <= 1) {
            return;
        }

        carouselTimer =
            window.setInterval(
                nextSlide,
                CAROUSEL_DELAY
            );

    }


    function stopCarousel() {

        if (carouselTimer !== null) {

            window.clearInterval(
                carouselTimer
            );

            carouselTimer = null;

        }

    }


    /* =====================================================
       THUMBNAILS
    ===================================================== */

    thumbnails.forEach(
        (thumbnail, index) => {

            thumbnail.addEventListener(
                "click",
                () => {

                    let targetIndex =
                        Number(
                            thumbnail.dataset.bgIndex
                        );


                    if (
                        Number.isNaN(
                            targetIndex
                        )
                    ) {
                        targetIndex = index;
                    }


                    if (
                        targetIndex < 0 ||
                        targetIndex >= heroImages.length
                    ) {
                        return;
                    }


                    updateHero(
                        targetIndex
                    );

                    startCarousel();

                }
            );

        }
    );


    /* =====================================================
       INITIAL HERO
    ===================================================== */

    if (heroBackgrounds.length) {

        updateHero(
            0,
            false
        );

        startCarousel();

    }


    /* =====================================================
       PAUSE HERO
    ===================================================== */

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
       TOUCH / SWIPE
    ===================================================== */

    let touchStartX = 0;

    if (hero) {

        hero.addEventListener(
            "touchstart",
            event => {

                if (
                    event.changedTouches.length
                ) {

                    touchStartX =
                        event.changedTouches[0]
                            .screenX;

                }

            },
            {
                passive: true
            }
        );


        hero.addEventListener(
            "touchend",
            event => {

                if (
                    !event.changedTouches.length
                ) {
                    return;
                }


                const touchEndX =
                    event.changedTouches[0]
                        .screenX;


                const distance =
                    touchEndX -
                    touchStartX;


                if (
                    Math.abs(distance) < 50
                ) {
                    return;
                }


                if (distance < 0) {
                    nextSlide();
                } else {
                    previousSlide();
                }


                startCarousel();

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       KEYBOARD HERO
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            const tag =
                document.activeElement?.tagName;


            if (
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            ) {
                return;
            }


            if (
                event.key === "ArrowRight"
            ) {

                nextSlide();

                startCarousel();

            }


            if (
                event.key === "ArrowLeft"
            ) {

                previousSlide();

                startCarousel();

            }

        }
    );


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, section, .card-expertise, .tech-card, .solution-card, .step-card, .contact-terminal"
        );


    revealElements.forEach(
        element => {

            element.classList.add(
                "reveal"
            );

        }
    );


    if (
        "IntersectionObserver" in window
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
        "IntersectionObserver" in window
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
       SMOOTH SCROLL
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


                        let target = null;

                        try {

                            target =
                                document.querySelector(
                                    targetId
                                );

                        } catch (error) {

                            return;

                        }


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const header =
                            document.querySelector(
                                ".site-header"
                            );


                        const offset =
                            header
                                ? header.offsetHeight + 10
                                : 76;


                        const position =
                            target
                                .getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            offset;


                        window.scrollTo({

                            top:
                                Math.max(
                                    position,
                                    0
                                ),

                            behavior:
                                "smooth"

                        });


                        if (nav) {

                            nav.classList.remove(
                                "active"
                            );

                        }


                        if (menuToggle) {

                            menuToggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }

                    }
                );

            }
        );


    /* =====================================================
       RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 850 &&
                nav &&
                menuToggle
            ) {

                nav.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       ESCAPE
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                nav &&
                menuToggle
            ) {

                nav.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

});