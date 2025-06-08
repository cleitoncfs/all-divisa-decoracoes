// =============================================
// 1. CONSTANTES E VARIÁVEIS GLOBAIS
// =============================================
const imagensGaleria = [
    "img/Img1.jpg",
    "img/Img2.jpg",
    "img/Img3.jpg",
    "img/Img4.jpg",
    "img/Img5.jpg",
    "img/Img6.jpg",
    "img/Img7.jpg",
    "img/Img8.jpg",
    "img/Img9.jpg",
];

let imagemAtual = 0;

// =============================================
// 2. FUNÇÕES PRINCIPAIS
// =============================================

// Menu Mobile
function setupMenuMobile() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navUl = document.querySelector("nav ul");

    menuToggle.addEventListener("click", () => {
        menuToggle.classList.toggle("active");
        navUl.classList.toggle("show");
    });
}

// Lightbox Gallery
function abrirLightbox(index) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-imagem");

    imagemAtual = index;
    lightboxImg.src = imagensGaleria[index];
    lightboxImg.alt = document.querySelectorAll(".galeria-item img")[index].alt;
    lightbox.style.display = "block";
    document.body.style.overflow = "hidden";
}

function fecharLightbox() {
    document.getElementById("lightbox").style.display = "none";
    document.body.style.overflow = "auto";
}

function mudarImagem(n) {
    imagemAtual =
        (imagemAtual + n + imagensGaleria.length) % imagensGaleria.length;
    const lightboxImg = document.getElementById("lightbox-imagem");
    lightboxImg.src = imagensGaleria[imagemAtual];
    lightboxImg.alt =
        document.querySelectorAll(".galeria-item img")[imagemAtual].alt;
}

// Destaque do menu ativo
function setupActiveMenu() {
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {
        link.addEventListener("click", function () {
            navLinks.forEach((l) => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    window.addEventListener("scroll", function () {
        const sections = document.querySelectorAll("section");
        let current = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 300) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
}

// =============================================
// 3. CONFIGURAÇÃO DE EVENTOS
// =============================================
function setupEventListeners() {
    // Lightbox: fechar ao clicar fora da imagem
    document.getElementById("lightbox").addEventListener("click", function (e) {
        if (e.target === this) fecharLightbox();
    });

    // Navegação por teclado
    document.addEventListener("keydown", function (e) {
        const lightbox = document.getElementById("lightbox");
        if (lightbox.style.display === "block") {
            if (e.key === "Escape") fecharLightbox();
            if (e.key === "ArrowLeft") mudarImagem(-1);
            if (e.key === "ArrowRight") mudarImagem(1);
        }
    });

    // Clique nas imagens da galeria
    document.querySelectorAll(".galeria-item img").forEach((img, index) => {
        img.addEventListener("click", () => abrirLightbox(index));
    });

    // 🚨 ADICIONE ESTES EVENTOS:
    document
        .getElementById("lightbox-fechar")
        .addEventListener("click", fecharLightbox);
    document
        .getElementById("lightbox-anterior")
        .addEventListener("click", (e) => {
            e.stopPropagation(); // Evita fechar ao clicar no botão
            mudarImagem(-1);
        });
    document
        .getElementById("lightbox-proximo")
        .addEventListener("click", (e) => {
            e.stopPropagation(); // Evita fechar ao clicar no botão
            mudarImagem(1);
        });
}

// =============================================
// 4. INICIALIZAÇÃO
// =============================================
function init() {
    setupMenuMobile();
    setupActiveMenu();
    setupEventListeners();

    // Remove os atributos onclick do HTML e substitui por event listeners
    document.querySelectorAll("[onclick]").forEach((element) => {
        const onclickValue = element.getAttribute("onclick");
        if (
            onclickValue.includes("abrirLightbox") ||
            onclickValue.includes("fecharLightbox") ||
            onclickValue.includes("mudarImagem")
        ) {
            element.removeAttribute("onclick");
        }
    });
}

document
    .getElementById("formContato")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const telefone = "5567992011664";
        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();
        const feedback = document.getElementById("feedbackMensagem");

        if (!nome || !email || !mensagem) {
            feedback.textContent = "Por favor, preencha todos os campos.";
            feedback.style.backgroundColor = "#e74c3c"; // vermelho erro
            feedback.classList.add("show");
            setTimeout(() => feedback.classList.remove("show"), 3000);
            return;
        }

        const texto = `Olá! Meu nome é ${nome}. Meu e-mail é ${email}. ${mensagem}`;
        const url = `https://wa.me/${telefone}?text=${encodeURIComponent(
            texto
        )}`;

        feedback.textContent =
            "Mensagem pronta para envio! Redirecionando ao WhatsApp...";
        feedback.style.backgroundColor = "#5ac790"; // verde sucesso
        feedback.classList.add("show");

        window.open(url, "_blank");

        this.reset();

        setTimeout(() => feedback.classList.remove("show"), 3000);
    });

// Inicia quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", init);
