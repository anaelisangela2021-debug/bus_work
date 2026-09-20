document.addEventListener("DOMContentLoaded", async () => {
    const editForm = document.getElementById("editForm");
    const btnPular = document.getElementById("btnPular");
    let emailLogado = localStorage.getItem("buswork_email_logado");

    const inputNome = document.getElementById("nome");
    const inputApelido = document.getElementById("apelido");
    const inputCpf = document.getElementById("cpf");
    const inputCep = document.getElementById("cep");
    const inputFoto = document.getElementById("fotoPerfil");
    const previewImg = document.getElementById("previewImg");
    const profileCircleClick = document.getElementById("profileCircleClick");

    let imagemBase64 = localStorage.getItem("buswork_foto") || "";
    let idUsuario = null;

    function bloquearCampo(inputElement, valor) {
        inputElement.value = valor;
        inputElement.setAttribute("readonly", true);
        inputElement.style.backgroundColor = "#e9ecef";
        inputElement.style.cursor = "not-allowed";
    }

    function liberarCampo(inputElement) {
        inputElement.value = "";
        inputElement.removeAttribute("readonly");
        inputElement.style.backgroundColor = "#fff";
        inputElement.style.cursor = "text";
    }

    // Preenchimento prévio com dados locais
    const nomeLocal = localStorage.getItem("buswork_nome");
    const apelidoLocal = localStorage.getItem("buswork_apelido");
    const fotoLocal = localStorage.getItem("buswork_foto");

    if (nomeLocal) inputNome.value = nomeLocal;
    if (apelidoLocal) inputApelido.value = apelidoLocal;
    if (fotoLocal) previewImg.src = fotoLocal;

    // 1. CARREGAR DADOS DO UTILIZADOR DO SERVIDOR
    try {
        const resposta = await fetch(`http://localhost:3000/usuarios`);
        if (resposta.ok) {
            const usuarios = await resposta.json();
            let usuarioAtual = null;

            if (emailLogado) {
                usuarioAtual = usuarios.find(u => u.email && u.email.trim().toLowerCase() === emailLogado.trim().toLowerCase());
            } else if (usuarios.length > 0) {
                // Caso não haja email registrado no localStorage, adota o primeiro utilizador como padrão
                usuarioAtual = usuarios[0];
                localStorage.setItem("buswork_email_logado", usuarioAtual.email);
            }

            if (usuarioAtual) {
                idUsuario = usuarioAtual.id;

                if (usuarioAtual.nome && usuarioAtual.nome.trim() !== "") {
                    bloquearCampo(inputNome, usuarioAtual.nome);
                } else {
                    liberarCampo(inputNome);
                }

                if (usuarioAtual.cpf && usuarioAtual.cpf.trim() !== "" && usuarioAtual.cpf !== "null") {
                    bloquearCampo(inputCpf, usuarioAtual.cpf);
                } else {
                    liberarCampo(inputCpf);
                }

                inputApelido.value = usuarioAtual.apelido || "";
                inputCep.value = usuarioAtual.cep || "";

                if (usuarioAtual.fotoPerfil && usuarioAtual.fotoPerfil !== "null") {
                    previewImg.src = usuarioAtual.fotoPerfil;
                    imagemBase64 = usuarioAtual.fotoPerfil;
                }
            }
        }
    } catch (e) {
        console.warn("Aviso: Não foi possível conectar ao servidor. Operando em modo offline via LocalStorage.", e);
    }

    // Interações com a foto de perfil
    if (profileCircleClick) {
        profileCircleClick.addEventListener("click", () => inputFoto.click());
    }

    if (inputFoto) {
        inputFoto.addEventListener("change", (e) => {
            const arquivo = e.target.files[0];
            if (arquivo) {
                if (arquivo.size > 1024 * 1024) {
                    alert("A foto é muito pesada! Escolha uma imagem com menos de 1MB.");
                    inputFoto.value = ""; 
                    return;
                }
                const leitor = new FileReader();
                leitor.onload = function(evento) {
                    imagemBase64 = evento.target.result;
                    previewImg.src = imagemBase64;
                };
                leitor.readAsDataURL(arquivo);
            }
        });
    }

    // Máscaras de entrada
    inputCpf.addEventListener("input", (e) => {
        if (e.target.hasAttribute("readonly")) return;
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d)/, "$1.$2");
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        e.target.value = value;
    });

    inputCep.addEventListener("input", (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 8) value = value.slice(0, 8);
        value = value.replace(/(\d{5})(\d)/, "$1-$2");
        e.target.value = value;
    });

    if (btnPular) {
        btnPular.addEventListener("click", () => {
            window.location.href = "06_tela_inicial_2_3.html";
        });
    }

    // 2. GUARDAR DADOS
    editForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome = inputNome.value.trim();
        const apelido = inputApelido.value.trim();
        const cep = inputCep.value.trim();
        const cpf = inputCpf.value.trim();

        // Guarda as informações localmente imediatamente
        if (nome) localStorage.setItem("buswork_nome", nome);
        if (apelido) localStorage.setItem("buswork_apelido", apelido);
        if (imagemBase64) localStorage.setItem("buswork_foto", imagemBase64);

        const dadosAtualizados = {
            nome: nome,
            apelido: apelido,
            cpf: cpf,
            cep: cep,
            fotoPerfil: imagemBase64
        };

        if (idUsuario) {
            try {
                await fetch(`http://localhost:3000/usuarios/${idUsuario}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dadosAtualizados)
                });
            } catch (erro) {
                console.warn("Servidor offline. Dados salvos localmente.", erro);
            }
        }

        alert("Dados salvos com sucesso!");
        window.location.href = "06_tela_inicial_2.html";
    });
});