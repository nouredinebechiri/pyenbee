/* ===============================
   MENU MOBILE
================================ */

const menuBtn =
    document.getElementById("menuBtn");

const nav =
    document.getElementById("nav");


if (menuBtn && nav) {

    menuBtn.addEventListener("click", () => {

        nav.classList.toggle("open");

        menuBtn.textContent =
            nav.classList.contains("open")
                ? "✕"
                : "☰";

    });


    document.querySelectorAll("#nav a")
        .forEach(link => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                menuBtn.textContent = "☰";

            });

        });

}


/* ===============================
   DARK MODE
================================ */

const themeBtn =
    document.getElementById("themeBtn");


if (themeBtn) {

    const savedTheme =
        localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark");

        themeBtn.textContent = "☀️";

    }


    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark");


        const dark =
            document.body.classList.contains("dark");


        if (dark) {

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeBtn.textContent = "☀️";

        } else {

            localStorage.setItem(
                "theme",
                "light"
            );

            themeBtn.textContent = "🌙";

        }

    });

}


/* ===============================
   RECHERCHE ARTICLES
================================ */

const searchInput =
    document.getElementById("searchInput");


if (searchInput) {

    const cards =
        document.querySelectorAll(".searchable");

    const noResults =
        document.getElementById("noResults");


    searchInput.addEventListener("input", () => {

        const value =
            searchInput.value
                .toLowerCase()
                .trim();


        let count = 0;


        cards.forEach(card => {

            const text =
                card.dataset.search
                    .toLowerCase();


            if (text.includes(value)) {

                card.style.display = "";

                count++;

            } else {

                card.style.display = "none";

            }

        });


        if (noResults) {

            noResults.style.display =
                count === 0
                    ? "block"
                    : "none";

        }

    });

}