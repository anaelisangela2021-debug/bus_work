function aplicarMascoteUsuario() {
    const mascoteSvg = localStorage.getItem("buswork_mascote_svg");

    if (!mascoteSvg) return;

    const fotoPerfilMenu = document.getElementById("fotoPerfilMenu");
    if (fotoPerfilMenu) {
        fotoPerfilMenu.innerHTML = mascoteSvg;
        fotoPerfilMenu.style.backgroundColor = "#FFF9D6";
        fotoPerfilMenu.style.padding = "4px";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Inicializa os ícones do Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Aplica o mascote
    aplicarMascoteUsuario();

    // Botão de Fechar
    const btnCloseMenu = document.getElementById("btnCloseMenu");
    if (btnCloseMenu) {
        btnCloseMenu.addEventListener("click", () => {
            window.location.href = "06_tela_inicial_2.html";
        });
    }
    
    // Botão Meu Bichinho
    const btnMeuBichinho = document.getElementById("btnMeuBichinho");
    if (btnMeuBichinho) {
        btnMeuBichinho.addEventListener("click", () => {
            window.location.href = "09_mascotes.html";
        });
    }
});