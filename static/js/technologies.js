const items = [
  { icon: "static/images/vmware-vsphere.png", 
    title: "VMware vSphere", 
    desc: "Une plateforme de virtualisation puissante qui permet de créer, gérer et optimiser une infrastructure informatique virtuelle.",
    desc_en: "A powerful virtualization platform that enables the creation, management, and optimization of a virtual IT infrastructure.",
    link:"#",
    categories_fr:"Virtualisation - SDDC",
    categories_en:"Virtualization - SDDC"
  },
  { icon: "static/images/vmware-vsan.png", 
    title: "VMware vSAN", 
    desc: "Une solution de stockage, elle permet de regrouper les disques des serveurs physique pour former un espace de stockage distribué.",
    desc_en: "A storage solution that aggregates the local disks of physical servers to create a distributed storage space.",
    link:"#",
    categories_fr:"Virtualisation - HCI",
    categories_en:"Virtualization - HCI"
  },
  { icon: "static/images/vmware-nsx.png", 
    title: "VMware NSX",
    desc: "Une plateforme de virtualisation réseau qui permet de créer, gérer et sécuriser dynamiquement l’infrastructure réseau de votre datacenter.",
    desc_en: "A network virtualization platform that enables dynamic creation, management, and security of your datacenter network infrastructure.",
    link:"#",
    categories_fr:"Virtualisation - SDN",
    categories_en:"Virtualization - SDN"

  },
  { icon: "static/images/docker.png", 
    title: "Docker",
    desc: "Docker permet d'exécuter des applications conteneurisées. Il simplifie leur déploiement et améliore la portabilité et la scalabilité.",
    desc_en: "Docker runs containerized applications.It simplifies deployment and improves portability and scalability.",
    link:"#",
    categories_fr:"Virtualisation - Conteneur",
    categories_en:"Virtualization - Container"

  },
  { icon: "static/images/kubernetes.png", 
    title: "Kubernetes",
    desc: "Kubernetes permet d’automatiser le déploiement, la gestion, la mise à l’échelle et la disponibilité des applications conteneurisées.",
    desc_en: "Kubernetes automates the deployment, management, scaling, and availability of containerized applications.",
    link:"#",
    categories_fr:"Virtualisation - Automatisation - Conteneur ",
    categories_en:"Virtualization - Automation, Container"

  },
  { icon: "static/images/nginx.png", 
    title: "Nginx",
    desc: "Un serveur web qui permet de gérer les requêtes HTTP et de distribuer le trafic réseau. Il améliore la rapidité et la sécurité des applications web.",
    desc_en: "A high web server that handles HTTP requests and distributes network traffic. It improves the speed and security of web applications.",
    link:"#",
    categories_fr:"Serveur web - Équilibrage de Charge - Proxy Inverse  ",
    categories_en:"Web Server - Load Balancing - Reverse Proxy"

  },
  
  { icon: "static/images/fortinet.png", 
    title: "Fortigate", 
    desc: "Un pare-feu nouvelle génération (NGFW), conçue pour protéger l'infrastructure IT contre les cybermenaces.",
    desc_en: "A next-generation firewall (NGFW), designed to protect IT infrastructure against cyber threats.",
    link:"#",
    categories_fr:"Sécurité - NGFW",
    categories_en:"Security - NGFW"
  },
  { icon: "static/images/fortiweb.png", 
    title: "FortiWeb", 
    desc: "Un pare-feu applicatif web (WAF), conçu pour protéger les applications web et les API contre les cybermenaces.",
    desc_en: "A Web Application Firewall (WAF), designed to protect web applications and APIs from cyber threats.",
    link:"https://www.fortinet.com/fr/products/web-application-firewall/fortiweb",
    categories_fr:"Sécurité - WAF",
    categories_en:"Security - WAF"
  },
   { icon: "static/images/fortimail.png", 
    title: "FortiMail", 
    desc: "Une solution de sécurité, conçue pour protéger les systèmes de messagerie contre le spam, les malwares et les menaces véhiculées par email.",
    desc_en: "An security solution designed to protect messaging systems against spam, malware, and advanced email-borne threats.",
    link:"#",
    categories_fr:"Sécurité - Passerelle de messagerie",
    categories_en:"Security - Mail Gateway"
  },
  { icon: "static/images/zabbix.png", 
    title: "ZABBIX", 
    desc: "Une solution de supervision pour surveiller en continu l’état de santé de vos systèmes, équipements réseau et services applicatifs.",
    desc_en: "An open-source monitoring solution designed to continuously track the health of your systems, network devices, and application services.",
    link:"#",
    categories_fr:"Supervision - Alerte",
    categories_en:"Monitoring - Alert"
  },

  { icon: "static/images/veeam.jpg", 
    title: "VEEAM", 
    desc: "Une solution de protection des données, elle permet de sauvegarder, répliquer et restaurer rapidement vos systèmes en cas d’incident.", 
    desc_en: "A data protection solution that enables you to back up, replicate, and quickly restore your systems in the event of an incident.",
    link:"#",
    categories_fr:"Protection - Sauvegarde",
    categories_en:"Protection - Backup"
  },
  { icon: "static/images/ad.png", 
    title: "Microsoft Active Directory", 
    desc: "Un service d’annuaire qui permet de centraliser la gestion des utilisateurs, des ordinateurs et des ressources au sein d’un réseau d’entreprise.",
    desc_en: "A directory service that centralizes the management of users, computers, and resources within an enterprise network.",
    link:"#",
    categories_fr:"Service d’annuaire",
    categories_en:"Directory service"
  },
  { icon: "static/images/exchange.png", 
    title: "Microsoft Exchange", 
    desc: "Une plateforme de messagerie conçue pour offrir une communication sécurisée, performante et centralisée au sein des entreprises.",
    desc_en: "A email platform designed to provide secure, efficient, and centralized communication within businesses.",
    link:"#",
    categories_fr:"Service de messagerie",
    categories_en:"Messaging service"
  },
  { icon: "static/images/sharepoint.png", 
    title: "Microsoft SharePoint", 
    desc: "Une plateforme collaborative conçue pour centraliser l'information, fluidifier la communication interne et faciliter le travail en équipe.",
    desc_en: "A collaborative platform designed to centralize information, streamline internal communication, and facilitate teamwork.",
    link:"#",
    categories_fr:"Service collaboratif",
    categories_en:"Collaborative service"
  },
 ];

const trackTechnology = document.getElementById("trackTechnology");
const carouselTechnology = document.getElementById("carouselTechnology");

// 🔁 génération + duplication
const allItems = [...items, ...items];

allItems.forEach(item => {
  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <div class="header">
      <img class="icon" src="${item.icon}" alt="">
      <div class="title"><a href="${item.link}" target="_blank">${item.title}</a></div>
    </div>
    <div data-lang="fr" class="desc">${item.desc}</div>
    <div data-lang="en" style="display:none" class="desc">${item.desc_en}</div>
    <div class="ligne"></div>
    <div data-lang="fr" class="desc"><b>${item.categories_fr}</b></div>
    <div data-lang="en" style="display:none" class="desc"><b>${item.categories_en}</b></div>
  `;

  trackTechnology.appendChild(div);
});

// 🎬 animation
let position = 0;
let speed = 1;
let isPaused = false;

function animate() {
  if (!isPaused) {
    position -= speed;

    if (Math.abs(position) >= trackTechnology.scrollWidth / 2) {
      position = 0;
    }

    trackTechnology.style.transform = `translateX(${position}px)`;
  }

  requestAnimationFrame(animate);
}

animate();

// ⏸ PAUSE AU HOVER / FOCUS
carouselTechnology.addEventListener("mouseenter", () => {
  isPaused = true;
});

carouselTechnology.addEventListener("mouseleave", () => {
  isPaused = false;
});