(function() {
    document.addEventListener("DOMContentLoaded", function () {
        const carousel = document.getElementById("carousel");
        if (!carousel) return;
        const track = carousel.querySelector("#track");
        const dotsContainer = carousel.querySelector("#dots");
        const prevBtn = carousel.querySelector(".prev");
        const nextBtn = carousel.querySelector(".next");

        // const images = [
        //     "/static/images/vcp-dcv.png",
        //     "/static/images/vsan-specialist.png",
        //     "/static/images/vcp-nv.jpeg",
        //     "/static/images/ummto.png",
        //     "/static/images/ummto.png"
        // ];

        // const titres_fr = [
        //     "VMware Certified Professional - Data Center Virtualization",
        //     "VMware Certified Specialist - vSAN",
        //     "VMware Certified Professional - Network Virtualization",
        //     "Master en Réseaux, Mobilités et Systèmes Embarqués",
        //     "Licence en Informatique"
        // ];
        //  const titres_en = [
        //     "VMware Certified Professional - Data Center Virtualization",
        //     "VMware Certified Specialist - vSAN",
        //     "VMware Certified Professional - Network Virtualization",
        //     "Master’s Degree in Networks, Mobility, and Embedded Systems",
        //     "Bachelor’s Degree in Computer Science"
        // ];
        // const certificatUrl =[
        //     "https://cp.certmetrics.com/vmware/en/public/verify/credential/5fbd473a41144071a71f249fd17191d5",
        //     "https://www.credly.com/badges/31e784ea-5f05-406a-85a2-59984374593e",
        //     "https://cp.certmetrics.com/vmware/en/public/verify/credential/f8588ad4c9c148b7bf992e5cd71a3dc7",
        //     "#certifications",
        //     "#certifications"
        // ]
        
        // const desc_fr = [
        //     "Cette certification valide que je peux mettre en œuvre, gérer et dépanner une infrastructure vSphere, en utilisant les meilleures pratiques pour fournir une base puissante, flexible et sécurisée pour l'agilité commerciale qui peut accélérer la transformation vers le cloud computing.",
        //     "Cette certification confirme mon expertise technique sur VMware vSAN. Elle valide ma capacité à comprendre son architecture et ses fonctionnalités, à concevoir et déployer une infrastructure vSAN. ainsi qu’à administrer et exploiter efficacement un cluster vSAN.",
        //     "Cette certification atteste de ma capacité à optimiser et transformer les opérations réseau et la sécurité informatique au sein de l’entreprise. Elle reconnaît mes compétences dans le déploiement, la configuration et la gestion de solutions de virtualisation réseau basées sur VMware NSX.",
        //     "J'ai acquis une solide expérience théorique et pratique à travers différents modules tels que l'architecture des systèmes embarqués, la programmation parallèle, les réseaux et leur sécurité, le développement mobile, la virtualisation, et bien plus encore.",
        //     "J'ai appris à coder, à gérer des bases de données et à comprendre les réseaux, la sécurité informatique et les systèmes. Cette formation m'a donné de solides bases dans plusieurs domaines de l'informatique et m'a aidé à m'adapter aux nouvelles technologies."
        // ];
        //  const desc_en = [
        //     "This certification validates my ability to implement, manage, and troubleshoot a vSphere infrastructure, using best practices to provide a powerful, flexible, and secure foundation for business agility that can accelerate the transformation to cloud computing.",
        //     "This certification confirms my technical expertise on VMware vSAN. It validates my ability to understand its vSAN architecture and its functionalities, to design and deploy a vSAN infrastructure, as well as to effectively administer and operate a vSAN cluster.",
        //     "This certification validates my ability to optimize and transform network operations and IT security within the enterprise. It recognizes my expertise in deploying, configuring, and managing network virtualization solutions based on VMware NSX.",
        //     "I gained solid theoretical and practical experience through various modules such as embedded systems architecture, parallel programming, networking and security, mobile development, virtualization, and much more.",
        //     "I learned how to code, manage databases, and understand networks, cybersecurity, and systems. This training provided me with a strong foundation in several areas of IT and helped me adapt to new technologies."
        // ];
        // const organization =[
        //     "VMWARE",
        //     "VMWARE",
        //     "VMWARE",
        //     "UMMTO",
        //     "UMMTO"
        // ]
        //  const organizationType_fr =[
        //     "Organisation",
        //     "Organisation",
        //     "Organisation",
        //     "Université",
        //     "Université"
        // ]

        //  const organizationType_en =[
        //     "Organization",
        //     "Organization",
        //     "Organization",
        //     "University",
        //     "University"
        // ]
        
        //   const organizationUrl =[
        //     "https://www.vmware.com/",
        //     "https://www.vmware.com/",
        //     "https://www.vmware.com/",
        //     "https://www.ummto.dz/",
        //     "https://www.ummto.dz/"
        // ]
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
