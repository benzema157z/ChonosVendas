"use strict";


/* =========================================================
   ELEMENTOS
========================================================= */

const header =
    document.getElementById("header");

const mobileMenu =
    document.getElementById("mobileMenu");

const navigation =
    document.getElementById("navigation");

const modal =
    document.getElementById("checkoutModal");

const closeModal =
    document.getElementById("closeModal");

const modalBackground =
    document.querySelector(".modal-background");

const checkoutForm =
    document.getElementById("checkoutForm");

const selectedPlan =
    document.getElementById("selectedPlan");

const selectedPrice =
    document.getElementById("selectedPrice");


/* =========================================================
   MENU MOBILE
========================================================= */

mobileMenu.addEventListener(
    "click",
    () => {

        navigation.classList.toggle("open");

    }
);


navigation
    .querySelectorAll("a")
    .forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navigation.classList.remove(
                    "open"
                );

            }
        );

    });


/* =========================================================
   HEADER SCROLL
========================================================= */

window.addEventListener(
    "scroll",
    () => {

        if (window.scrollY > 20) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }
);


/* =========================================================
   FAQ
========================================================= */

const faqItems =
    document.querySelectorAll(".faq-item");


faqItems.forEach(item => {

    const question =
        item.querySelector(".faq-question");

    const answer =
        item.querySelector(".faq-answer");


    question.addEventListener(
        "click",
        () => {

            const isOpen =
                item.classList.contains("open");


            faqItems.forEach(other => {

                other.classList.remove("open");

                const otherAnswer =
                    other.querySelector(".faq-answer");

                otherAnswer.style.maxHeight =
                    null;

            });


            if (!isOpen) {

                item.classList.add("open");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";

            }

        }
    );

});


/* =========================================================
   CHECKOUT
========================================================= */

const pricingButtons =
    document.querySelectorAll(
        ".pricing-button"
    );


pricingButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const plan =
                button.dataset.plan;

            const price =
                Number(button.dataset.price);


            selectedPlan.textContent =
                plan;


            selectedPrice.textContent =
                price.toLocaleString(
                    "pt-BR",
                    {
                        style: "currency",
                        currency: "BRL"
                    }
                );


            modal.classList.add("active");

            document.body.classList.add(
                "modal-open"
            );

        }
    );

});


/* =========================================================
   FECHAR CHECKOUT
========================================================= */

function closeCheckout() {

    modal.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "modal-open"
    );

}


closeModal.addEventListener(
    "click",
    closeCheckout
);


modalBackground.addEventListener(
    "click",
    closeCheckout
);


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {

            closeCheckout();

        }

    }
);


/* =========================================================
   FORMULÁRIO
========================================================= */

checkoutForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const name =
            document
                .getElementById("customerName")
                .value
                .trim();


        const email =
            document
                .getElementById("customerEmail")
                .value
                .trim();


        if (!name || !email) {

            alert(
                "Preencha seu nome e e-mail."
            );

            return;

        }


        /*
        =====================================================
        PAGAMENTO REAL
        =====================================================

        Aqui deverá entrar a integração
        com o seu servidor / gateway.

        Exemplo conceitual:

        window.location.href =
            "SEU_CHECKOUT";

        Não coloque chaves secretas
        diretamente neste arquivo.

        =====================================================
        */


        alert(
            "Pedido iniciado!\n\n" +
            "Plano: " +
            selectedPlan.textContent +
            "\nValor: " +
            selectedPrice.textContent +
            "\nE-mail: " +
            email
        );

    }
);


/* =========================================================
   EFEITO PARALLAX DO NÚCLEO
========================================================= */

const heroVisual =
    document.querySelector(".hero-visual");


document.addEventListener(
    "mousemove",
    event => {

        if (
            window.innerWidth < 800
        ) {

            return;

        }


        const x =
            (event.clientX /
                window.innerWidth -
                .5) * 10;


        const y =
            (event.clientY /
                window.innerHeight -
                .5) * 10;


        heroVisual.style.transform =
            `translate(${x}px, ${y}px)`;

    }
);


/* =========================================================
   ANIMAÇÃO DE ENTRADA
========================================================= */

const animatedElements =
    document.querySelectorAll(
        ".tech-card, .pricing-card, .terminal, .experience-copy"
    );


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

                }

            });

        },
        {
            threshold: .12
        }
    );


animatedElements.forEach(
    element => {

        observer.observe(element);

    }
);


/* =========================================================
   NAVEGAÇÃO ATIVA
========================================================= */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".navigation a"
    );


window.addEventListener(
    "scroll",
    () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            if (
                window.scrollY >=
                sectionTop
            ) {

                current =
                    section.getAttribute(
                        "id"
                    );

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }
);


/* =========================================================
   ESTRELAS DINÂMICAS
========================================================= */

const stars =
    document.querySelector(".stars");


function createStars() {

    if (!stars) return;


    for (
        let i = 0;
        i < 70;
        i++
    ) {

        const star =
            document.createElement("span");


        star.style.position =
            "absolute";


        star.style.width =
            Math.random() > .8
                ? "2px"
                : "1px";


        star.style.height =
            star.style.width;


        star.style.borderRadius =
            "50%";


        star.style.background =
            "white";


        star.style.opacity =
            Math.random() * .4;


        star.style.left =
            Math.random() * 100 + "%";


        star.style.top =
            Math.random() * 100 + "%";


        star.style.animation =
            `twinkle ${
                2 + Math.random() * 5
            }s ease-in-out infinite`;


        star.style.animationDelay =
            Math.random() * 5 + "s";


        stars.appendChild(star);

    }

}


const starStyle =
    document.createElement("style");


starStyle.textContent = `

@keyframes twinkle {

    0%,100% {
        opacity: .08;
        transform: scale(.8);
    }

    50% {
        opacity: .55;
        transform: scale(1.2);
    }

}

`;


document.head.appendChild(
    starStyle
);


createStars();