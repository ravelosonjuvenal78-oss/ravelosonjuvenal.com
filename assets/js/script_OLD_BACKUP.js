/* =========================================================
   RAVELOSON Juvenal
   MAIN JAVASCRIPT
   COMPLETE VERSION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


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

        menuToggle.addEventListener(
            "click",
            function () {

                const active =
                    nav.classList.toggle("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    String(active)
                );

            }
        );


        nav.querySelectorAll("a").forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        nav.classList.remove(
                            "active"
                        );

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }
                );

            }
        );

    }



    /* =====================================================
       LANGUAGE SWITCHER
    ===================================================== */

    let currentLanguage = "fr";


    window.setLanguage = function (language) {

        if (
            language !== "fr" &&
            language !== "en"
        ) {
            return;
        }


        currentLanguage =
            language;


        document.documentElement.lang =
            language;


        document
            .querySelectorAll("[data-key]")
            .forEach(function (element) {

                const key =
                    element.getAttribute(
                        "data-key"
                    );


                if (
                    !window.translations ||
                    !window.translations[key]
                ) {
                    return;
                }


                const translation =
                    window.translations[key][language];


                if (
                    translation !== undefined
                ) {

                    element.textContent =
                        translation;

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

        } catch (error) {

            /* localStorage unavailable */

        }

    };



    /* =====================================================
       LOAD SAVED LANGUAGE
    ===================================================== */

    let savedLanguage = "fr";

    try {

        savedLanguage =
            localStorage.getItem(
                "portfolioLanguage"
            ) || "fr";

    } catch (error) {

        savedLanguage = "fr";

    }


    window.setLanguage(
        savedLanguage
    );



    /* =====================================================
       HERO CAROUSEL
    ===================================================== */

    const heroBackgrounds =
        document.querySelectorAll(
            ".hero-bg"
        );


    const thumbnails =
        document.querySelectorAll(
            ".side-thumbnails .thumb"
        );


    const heroImages = [

        {
            src:
                "assets/images/web-develloppeur.png",

            title:
                "WEB DEVELOPMENT"
        },

        {
            src:
                "assets/images/DATA SYSTEMS.png",

            title:
                "DATA SYSTEMS"
        },

        {
            src:
                "assets/images/IT INFRASTRUCTURE.png",

            title:
                "IT INFRASTRUCTURE"
        },

        {
            src:
                "assets/images/DIGITAL TRANSFORMATION.png",

            title:
                "DIGITAL TRANSFORMATION"
        },

        {
            src:
                "assets/images/web-man.png",

            title:
                "DIGITAL SOLUTIONS"
        }

    ];


    let currentIndex = 0;

    let carouselTimer = null;

    let isChanging = false;



    /* =====================================================
       PRELOAD
    ===================================================== */

    heroImages.forEach(
        function (image) {

            const preload =
                new Image();

            preload.src =
                image.src;

        }
    );



    /* =====================================================
       PREPARE BACKGROUNDS
    ===================================================== */

    heroImages.forEach(
        function (image, index) {

            const background =
                heroBackgrounds[index];


            if (!background) {
                return;
            }


            background.style.backgroundImage =
                "url('" +
                image.src +
                "')";

        }
    );



    /* =====================================================
       UPDATE HERO
    ===================================================== */

    function updateHero(
        index,
        animate = true
    ) {

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
            function (background, i) {

                background.classList.toggle(
                    "active",
                    i === index
                );

            }
        );


        thumbnails.forEach(
            function (thumbnail, i) {

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


        currentIndex =
            index;


        if (animate) {

            window.setTimeout(
                function () {

                    isChanging =
                        false;

                },
                700
            );

        } else {

            isChanging =
                false;

        }

    }



    /* =====================================================
       NEXT
    ===================================================== */

    function nextSlide() {

        if (
            heroImages.length <= 1
        ) {
            return;
        }


        const nextIndex =
            (
                currentIndex + 1
            )
            %
            heroImages.length;


        updateHero(
            nextIndex
        );

    }



    /* =====================================================
       PREVIOUS
    ===================================================== */

    function previousSlide() {

        if (
            heroImages.length <= 1
        ) {
            return;
        }


        const previousIndex =
            (
                currentIndex -
                1 +
                heroImages.length
            )
            %
            heroImages.length;


        updateHero(
            previousIndex
        );

    }



    /* =====================================================
       START AUTOPLAY
       6.5 SECONDS
    ===================================================== */

    function startCarousel() {

        stopCarousel();


        if (
            heroImages.length <= 1
        ) {
            return;
        }


        carouselTimer =
            window.setInterval(
                function () {

                    nextSlide();

                },
                6500
            );

    }



    /* =====================================================
       STOP AUTOPLAY
    ===================================================== */

    function stopCarousel() {

        if (
            carouselTimer !== null
        ) {

            window.clearInterval(
                carouselTimer
            );

            carouselTimer =
                null;

        }

    }



    /* =====================================================
       THUMBNAIL CLICK
    ===================================================== */

    thumbnails.forEach(
        function (thumbnail, index) {

            thumbnail.addEventListener(
                "click",
                function () {

                    let targetIndex =
                        Number(
                            thumbnail.dataset.bgIndex
                        );


                    if (
                        Number.isNaN(
                            targetIndex
                        )
                    ) {

                        targetIndex =
                            index;

                    }


                    if (
                        targetIndex >=
                        heroImages.length
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

    if (
        heroBackgrounds.length
    ) {

        updateHero(
            0,
            false
        );

    }



    /* =====================================================
       HERO MOUSE PAUSE
    ===================================================== */

    const hero =
        document.querySelector(
            ".hero-container"
        );


    if (hero) {

        hero.addEventListener(
            "mouseenter",
            function () {

                stopCarousel();

            }
        );


        hero.addEventListener(
            "mouseleave",
            function () {

                startCarousel();

            }
        );

    }



    /* =====================================================
       TOUCH / SWIPE
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    if (hero) {

        hero.addEventListener(
            "touchstart",
            function (event) {

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
            function (event) {

                if (
                    !event.changedTouches.length
                ) {
                    return;
                }


                touchEndX =
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


                if (
                    distance < 0
                ) {

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
       KEYBOARD CAROUSEL
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            const tag =
                document.activeElement
                    ?.tagName;


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
       START CAROUSEL
    ===================================================== */

    startCarousel();



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section"
        );


    revealElements.forEach(
        function (element) {

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
                function (entries) {

                    entries.forEach(
                        function (entry) {

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
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    } else {

        revealElements.forEach(
            function (element) {

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
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                navLinks.forEach(
                                    function (link) {

                                        const href =
                                            link.getAttribute(
                                                "href"
                                            );


                                        link.classList.toggle(
                                            "active",
                                            href ===
                                            "#" +
                                            entry.target.id
                                        );

                                    }
                                );

                            }

                        }
                    );

                },
                {
                    rootMargin:
                        "-25% 0px -60% 0px",

                    threshold:
                        0
                }
            );


        sections.forEach(
            function (section) {

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
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

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

                    }
                );

            }
        );



    /* =====================================================
       CLOSE MOBILE MENU ON RESIZE
    ===================================================== */

    window.addEventListener(
        "resize",
        function () {

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
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

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