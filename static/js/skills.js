
const skillsData = [
    {
        icon : "static/images/datacenter.png",
        title_fr: "Infrastructure",
        title_en: "Infrastructure",
        
        desc_fr: [
            "Conception et déploiement d’infrastructures physiques et virtuelles reposant sur la virtualisation et l’hyperconvergence."
        ],
        desc_en: [
            "Design and deployment of physical and virtual infrastructures based on virtualization and hyperconvergence."
        ],
        techno: [
            "<b>TECHNOLOGIES</b><br>Virtualization, HCI, SDN, Container, Automation, RAID, SAN, NAS, LDAP, SSO"
        ],
    },
    {   icon : "static/images/network.png",
        title_fr: "Réseaux",
        title_en: "Networking",
        desc_fr: [
            "Conception et configuration d’infrastructures réseau performantes, segmentées et redondantes."
        ],
        desc_en: [
            "Design and configuration of high-performance, segmented, and redundant network infrastructures."
        ],

        techno: [
           "<b>TECHNOLOGIES</b><br> Segmentation, VLAN, Overlay, LACP, Load Balancing "
        ],
    },
    {   icon : "static/images/cybersecurity.png",
        title_fr: "Cybersécurité",
        title_en: "Cybersecurity",
        desc_fr: [
            "Déploiement de solutions de cybersécurité et mise en place de politiques pour protéger les systèmes et les applications critiques."
        ],
        desc_en: [
            "Deployment of cybersecurity solutions and implementation of policies to protect systems and critical applications."
        ],
        techno: [
            "<b>TECHNOLOGIES</b><br> Firewall, WAF, VPN, Antivirus/EDR, SIEM, Anti-spam, Anti-phishing"
        ],

    }
    // {   icon : "img/collaboration.png",
    //     title_fr: "Solutions Collaboratifs",
    //     title_en: "Collaborative Solutions",
    //     desc_fr: [
    //         "Déploiement de services collaboratifs  et mise en œuvre de solutions assurant la productivité des utilisateurs au sein de l’entreprise.",
    //         "<b>TECHNOLOGIES</b><br>Open source ou proprietaire , Portail d'entreprise, Serveurs de fichiers, Serveurs d’impression."
    //     ],
    //     desc_en: [
    //         "Deployment of collaborative services and implementation of solutions to enhance user productivity within the organization.",
    //         "<b>TECHNOLOGIES</b><br>Open source or proprietary, Intranet Portal, File Servers, Print Servers."
    //     ]
    // },
];

// Récupération du conteneur HTML
const container = document.getElementById("skillsContainer");

// Boucle pour générer les cartes
skillsData.forEach(skill => {
    const card = document.createElement("div");
    card.classList.add("skill-card");

    let content = `
        <div class="skills-icon"><img class="skills-icon" src="${skill.icon}" alt=""></div>
        
        <h3 data-lang="fr" class="section-title">${skill.title_fr}</h3>
        ${skill.desc_fr.map(p => `<p data-lang="fr">${p}</p>`).join("")}
        <p data-lang="fr">${skill.techno}</p>
        

        <h3 data-lang="en" class="section-title" style="display:none">${skill.title_en}</h3>
        ${skill.desc_en.map(p => `<p data-lang="en" style="display:none">${p}</p>`).join("")}
        <p data-lang="en" style="display:none">${skill.techno}</p>
        
    `;

    card.innerHTML = content;
    container.appendChild(card);
});
