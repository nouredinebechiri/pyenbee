(function() {
    document.addEventListener("DOMContentLoaded", function () {
        const carousel = document.getElementById("carousel");
        if (!carousel) return;
        const track = carousel.querySelector("#track");
        const dotsContainer = carousel.querySelector("#dots");
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");

        // Génération des slides
        const slides = [];
        const dots = [];
        
        for (let i = 0; i < 5; i++) {
            const slide = document.createElement("div");
            slide.className = "carousel-slide";
            slide.style.visibility = "hidden"; // invisible avant positionnement

            // slide.innerHTML = `
            //     <img src="${images[i]}" alt="Logo">
            //     <h3>
            //         <a href="${certificatUrl[i]}" target="_blank">
            //             <span data-lang="fr">${titres_fr[i]}</span>
            //             <span data-lang="en" style="display:none">${titres_en[i]}</span>
            //         </a>
            //     </h3>
            //     <p data-lang="fr">${desc_fr[i]}</p>
            //     <p data-lang="en" style="display:none">${desc_en[i]}</p>
            //     <p><span data-lang="fr">Livrée par </span> <span data-lang="en" style="display:none">Issued by </span><a href="${organizationUrl[i]}" target="_blank">${organization[i]}</a>, <span data-lang="fr">${organizationType_fr[i]}</span> <span data-lang="en" style="display:none">${organizationType_en[i]}</span></p>
            // `;
            track.appendChild(slide);
            slides.push(slide);

            const dot = document.createElement("span");
            dotsContainer.appendChild(dot);
            dots.push(dot);
        }

        let index = 0;
        let autoSlide = null;

        function updateCarousel() {
            track.style.transform = `translateX(-${index * 100}%)`;
            slides.forEach(slide => slide.style.visibility = "visible");
            dots.forEach(d => d.classList.remove("active"));
            dots[index].classList.add("active");
        }

        function nextSlide() {
            index = (index + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            index = (index - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlide = setInterval(nextSlide, 5500);
        }

        function stopAutoSlide() {
            if (autoSlide) clearInterval(autoSlide);
        }

        // Boutons
        nextBtn.addEventListener("click", () => { nextSlide(); startAutoSlide(); });
        prevBtn.addEventListener("click", () => { prevSlide(); startAutoSlide(); });

        // Dots
        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                index = i;
                updateCarousel();
                startAutoSlide();
            });
        });

        // Swipe mobile
        let startX = 0;
        carousel.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
        carousel.addEventListener("touchend", e => {
            let endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) nextSlide();
            if (endX - startX > 50) prevSlide();
            startAutoSlide();
        });

        // Init
        updateCarousel();
        startAutoSlide();
    });
})();
