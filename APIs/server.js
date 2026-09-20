const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const CAMINHO_JSON = path.join(__dirname, 'usuarios.json');

app.use(cors());
// Limite aumentado para aceitar fotos em Base64 grandes
app.use(express.json({ limit: '50mb' }));

function lerUsuarios() {
    try {
        if (!fs.existsSync(CAMINHO_JSON)) {
            fs.writeFileSync(CAMINHO_JSON, JSON.stringify({ usuarios: [] }, null, 2), 'utf-8');
            return [];
        }
        const conteudo = fs.readFileSync(CAMINHO_JSON, 'utf-8');
        const dados = JSON.parse(conteudo);
        return dados.usuarios || [];
    } catch (erro) {
        console.error('Erro ao ler usuarios.json:', erro);
        return [];
    }
}

function salvarUsuarios(usuarios) {
    try {
        fs.writeFileSync(CAMINHO_JSON, JSON.stringify({ usuarios }, null, 2), 'utf-8');
    } catch (erro) {
        console.error('Erro ao salvar em usuarios.json:', erro);
    }
}

// GET /usuarios
app.get('/usuarios', (req, res) => {
    res.json(lerUsuarios());
});

// POST /usuarios
app.post('/usuarios', (req, res) => {
    const { nome, email, senha } = req.body;

    if (!email) {
        return res.status(400).json({ erro: "O e-mail é obrigatório." });
    }

    const usuarios = lerUsuarios();
    const novoUsuario = {
        id: Date.now().toString(),
        nome: nome || "",
        email: email.trim().toLowerCase(),
        senha: senha || "",
        apelido: nome || "",
        cpf: "",
        cep: "",
        fotoPerfil: ""
    };

    usuarios.push(novoUsuario);
    salvarUsuarios(usuarios);

    return res.status(201).json({ mensagem: "Utilizador criado com sucesso!", usuario: novoUsuario });
});

// PATCH /usuarios/:id
app.patch('/usuarios/:id', (req, res) => {
    const { id } = req.params;
    const { nome, apelido, cpf, cep, fotoPerfil, senha } = req.body;

    const usuarios = lerUsuarios();
    const indice = usuarios.findIndex(u => String(u.id) === String(id));

    if (indice === -1) {
        return res.status(404).json({ erro: "Utilizador não encontrado pelo ID." });
    }

    usuarios[indice] = {
        ...usuarios[indice],
        ...(nome !== undefined && { nome }),
        ...(apelido !== undefined && { apelido }),
        ...(cpf !== undefined && { cpf }),
        ...(cep !== undefined && { cep }),
        ...(fotoPerfil !== undefined && { fotoPerfil }),
        ...(senha !== undefined && { senha })
    };

    salvarUsuarios(usuarios);
    return res.status(200).json({ mensagem: "Perfil atualizado com sucesso!", usuario: usuarios[indice] });
});

// PUT /usuarios/atualizar
app.put('/usuarios/atualizar', (req, res) => {
    const { email, nome, apelido, cpf, cep, fotoPerfil, senha } = req.body;

    if (!email) {
        return res.status(400).json({ erro: "E-mail do utilizador não fornecido." });
    }

    const usuarios = lerUsuarios();
    const indice = usuarios.findIndex(u => u.email && u.email.toLowerCase() === email.toLowerCase());

    if (indice !== -1) {
        usuarios[indice] = {
            ...usuarios[indice],
            ...(nome !== undefined && { nome }),
            ...(apelido !== undefined && { apelido }),
            ...(cpf !== undefined && { cpf }),
            ...(cep !== undefined && { cep }),
            ...(fotoPerfil !== undefined && { fotoPerfil }),
            ...(senha !== undefined && { senha })
        };

        salvarUsuarios(usuarios);
        return res.status(200).json({ mensagem: "Perfil atualizado com sucesso!", usuario: usuarios[indice] });
    } else {
        const novoUsuario = {
            id: Date.now().toString(),
            nome: nome || "",
            email: email.trim().toLowerCase(),
            senha: senha || "",
            apelido: apelido || "",
            cpf: cpf || "",
            cep: cep || "",
            fotoPerfil: fotoPerfil || ""
        };

        usuarios.push(novoUsuario);
        salvarUsuarios(usuarios);
        return res.status(200).json({ mensagem: "Perfil criado com sucesso!", usuario: novoUsuario });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor a rodar na porta ${PORT}`);
});