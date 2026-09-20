document.addEventListener("DOMContentLoaded", () => {
    const btnVoltar = document.getElementById("btnVoltar");

    if (btnVoltar) {
        btnVoltar.addEventListener("click", () => {
            window.location.href = "06_tela_inicial.html";
        });
    }
});

function resgatarCupom(nomeEmpresa) {
    alert(`Cupom para ${nomeEmpresa} resgatado com sucesso! Apresente o código no estabelecimento.`);
}