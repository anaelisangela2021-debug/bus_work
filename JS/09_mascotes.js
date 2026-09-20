document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  const mascotsGrid = document.getElementById("mascotsGrid");
  const btnConfirmar = document.getElementById("btnConfirmar");
  const btnVoltar = document.getElementById("btnVoltar");

  let mascoteSelecionadoId = localStorage.getItem("buswork_mascote_id") || null;

  // Lista dos mascotes
  const mascotes = [
    {
      id: "pneu",
      nome: "Pneuzinho",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="38" fill="#2D3139"/><circle cx="50" cy="50" r="22" fill="#FAFAFC"/><circle cx="50" cy="50" r="38" stroke="#3F4450" stroke-width="4" fill="none"/><circle cx="42" cy="46" r="3.5" fill="#1A1D20"/><circle cx="58" cy="46" r="3.5" fill="#1A1D20"/><circle cx="43.5" cy="44.5" r="1.2" fill="#FFF"/><circle cx="59.5" cy="44.5" r="1.2" fill="#FFF"/><path d="M 45 54 Q 50 59 55 54" stroke="#1A1D20" stroke-width="2.5" stroke-linecap="round" fill="none"/><ellipse cx="36" cy="51" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/><ellipse cx="64" cy="51" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/></svg>`
    },
    {
      id: "capivara",
      nome: "Capivara",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="50" cy="55" rx="32" ry="28" fill="#A06A42"/><circle cx="28" cy="36" r="8" fill="#84522D"/><circle cx="72" cy="36" r="8" fill="#84522D"/><ellipse cx="50" cy="48" rx="28" ry="22" fill="#B27A52"/><circle cx="38" cy="44" r="3.5" fill="#1A1D20"/><circle cx="62" cy="44" r="3.5" fill="#1A1D20"/><circle cx="39.5" cy="42.5" r="1.2" fill="#FFF"/><circle cx="63.5" cy="42.5" r="1.2" fill="#FFF"/><ellipse cx="50" cy="54" rx="8" ry="5.5" fill="#5C381E"/><path d="M 46 60 Q 50 63 54 60" stroke="#5C381E" stroke-width="2" stroke-linecap="round" fill="none"/><ellipse cx="30" cy="50" rx="4.5" ry="3" fill="#FF8A8A" opacity="0.5"/><ellipse cx="70" cy="50" rx="4.5" ry="3" fill="#FF8A8A" opacity="0.5"/></svg>`
    },
    {
      id: "cachorro",
      nome: "Cachorro",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><ellipse cx="24" cy="46" rx="9" ry="18" fill="#8C532B"/><ellipse cx="76" cy="46" rx="9" ry="18" fill="#8C532B"/><circle cx="50" cy="50" r="30" fill="#D99B66"/><ellipse cx="50" cy="58" rx="14" ry="10" fill="#FFF0E6"/><circle cx="38" cy="45" r="4" fill="#1A1D20"/><circle cx="62" cy="45" r="4" fill="#1A1D20"/><circle cx="39.5" cy="43.5" r="1.3" fill="#FFF"/><circle cx="63.5" cy="43.5" r="1.3" fill="#FFF"/><ellipse cx="50" cy="54" rx="5" ry="3.5" fill="#2D1E18"/><path d="M 46 60 Q 50 64 54 60" stroke="#2D1E18" stroke-width="2" fill="none"/><ellipse cx="30" cy="51" rx="4.5" ry="3" fill="#FF8A8A" opacity="0.6"/><ellipse cx="70" cy="51" rx="4.5" ry="3" fill="#FF8A8A" opacity="0.6"/></svg>`
    },
    {
      id: "gato",
      nome: "Gato",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><polygon points="22,20 40,36 20,48" fill="#9AA0A6"/><polygon points="78,20 60,36 80,48" fill="#9AA0A6"/><polygon points="25,24 37,36 24,44" fill="#FFB7C5"/><polygon points="75,24 63,36 76,44" fill="#FFB7C5"/><circle cx="50" cy="52" r="29" fill="#BDC1C6"/><ellipse cx="37" cy="48" rx="3.5" ry="4.5" fill="#1A1D20"/><ellipse cx="63" cy="48" rx="3.5" ry="4.5" fill="#1A1D20"/><circle cx="38" cy="46" r="1.3" fill="#FFF"/><circle cx="64" cy="46" r="1.3" fill="#FFF"/><polygon points="50,55 46,52 54,52" fill="#FFB7C5"/><path d="M 46 58 Q 50 61 54 58" stroke="#555" stroke-width="2" fill="none"/><ellipse cx="29" cy="53" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/><ellipse cx="71" cy="53" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/></svg>`
    },
    {
      id: "leao",
      nome: "Leão",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="38" fill="#E67E22"/><circle cx="50" cy="52" r="27" fill="#F39C12"/><circle cx="38" cy="46" r="3.5" fill="#1A1D20"/><circle cx="62" cy="46" r="3.5" fill="#1A1D20"/><circle cx="39.5" cy="44.5" r="1.2" fill="#FFF"/><circle cx="63.5" cy="44.5" r="1.2" fill="#FFF"/><ellipse cx="50" cy="54" rx="10" ry="7" fill="#FDEBD0"/><polygon points="50,55 46,51 54,51" fill="#A04000"/><path d="M 46 59 Q 50 62 54 59" stroke="#A04000" stroke-width="2" fill="none"/><ellipse cx="29" cy="52" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/><ellipse cx="71" cy="52" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/></svg>`
    },
    {
      id: "onca",
      nome: "Onça",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="28" cy="30" r="9" fill="#F39C12"/><circle cx="72" cy="30" r="9" fill="#F39C12"/><circle cx="50" cy="52" r="29" fill="#F1C40F"/><circle cx="36" cy="42" r="3" fill="#1A1D20"/><circle cx="64" cy="42" r="3" fill="#1A1D20"/><ellipse cx="38" cy="48" rx="3.5" ry="4" fill="#1A1D20"/><ellipse cx="62" cy="48" rx="3.5" ry="4" fill="#1A1D20"/><circle cx="39" cy="46.5" r="1.2" fill="#FFF"/><circle cx="63" cy="46.5" r="1.2" fill="#FFF"/><ellipse cx="50" cy="56" rx="9" ry="6" fill="#FFF8DC"/><polygon points="50,56 46,53 54,53" fill="#A04000"/><ellipse cx="38" cy="34" rx="2" ry="1" fill="#7E5109"/><ellipse cx="62" cy="34" rx="2" ry="1" fill="#7E5109"/><ellipse cx="50" cy="32" rx="2" ry="1" fill="#7E5109"/><ellipse cx="30" cy="52" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/><ellipse cx="70" cy="52" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/></svg>`
    },
    {
      id: "arara",
      nome: "Arara",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="29" fill="#E74C3C"/><path d="M 21 50 Q 15 70 28 78 Q 38 68 35 50 Z" fill="#3498DB"/><ellipse cx="44" cy="48" rx="12" ry="14" fill="#FFF"/><circle cx="42" cy="45" r="3.5" fill="#1A1D20"/><circle cx="43" cy="43.5" r="1.2" fill="#FFF"/><path d="M 48 46 Q 68 48 64 64 Q 52 58 48 53 Z" fill="#2C3E50"/><ellipse cx="36" cy="54" rx="3.5" ry="2" fill="#FF8A8A" opacity="0.6"/></svg>`
    },
    {
      id: "elefante",
      nome: "Elefante",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="25" cy="50" r="16" fill="#95A5A6"/><circle cx="75" cy="50" r="16" fill="#95A5A6"/><circle cx="50" cy="50" r="27" fill="#BDC3C7"/><circle cx="38" cy="45" r="3.5" fill="#1A1D20"/><circle cx="62" cy="45" r="3.5" fill="#1A1D20"/><circle cx="39.5" cy="43.5" r="1.2" fill="#FFF"/><circle cx="63.5" cy="43.5" r="1.2" fill="#FFF"/><path d="M 46 52 Q 50 68 56 62 Q 58 58 52 58 Q 48 60 48 52 Z" fill="#95A5A6"/><ellipse cx="29" cy="51" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/><ellipse cx="71" cy="51" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/></svg>`
    },
    {
      id: "cobra",
      nome: "Cobra",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><path d="M 25 68 Q 38 52 50 68 Q 62 80 75 66" stroke="#2ECC71" stroke-width="14" stroke-linecap="round" fill="none"/><circle cx="30" cy="44" r="18" fill="#2ECC71"/><ellipse cx="30" cy="47" rx="12" ry="10" fill="#A3E4D7"/><circle cx="24" cy="40" r="3" fill="#1A1D20"/><circle cx="36" cy="40" r="3" fill="#1A1D20"/><circle cx="25" cy="38.5" r="1" fill="#FFF"/><circle cx="37" cy="38.5" r="1" fill="#FFF"/><path d="M 30 52 L 30 60 L 27 63 M 30 60 L 33 63" stroke="#E74C3C" stroke-width="2" stroke-linecap="round" fill="none"/><ellipse cx="18" cy="44" rx="3" ry="2" fill="#FF8A8A" opacity="0.6"/><ellipse cx="42" cy="44" rx="3" ry="2" fill="#FF8A8A" opacity="0.6"/></svg>`
    },
    {
      id: "carneiro",
      nome: "Carneiro",
      svg: `<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="32" cy="38" r="10" fill="#ECF0F1"/><circle cx="68" cy="38" r="10" fill="#ECF0F1"/><circle cx="50" cy="32" r="12" fill="#ECF0F1"/><circle cx="50" cy="54" r="26" fill="#F5CBA7"/><circle cx="38" cy="48" r="3.5" fill="#1A1D20"/><circle cx="62" cy="48" r="3.5" fill="#1A1D20"/><circle cx="39.5" cy="46.5" r="1.2" fill="#FFF"/><circle cx="63.5" cy="46.5" r="1.2" fill="#FFF"/><ellipse cx="50" cy="56" rx="4" ry="2.5" fill="#E59866"/><path d="M 46 60 Q 50 63 54 60" stroke="#E59866" stroke-width="2" fill="none"/><ellipse cx="30" cy="53" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/><ellipse cx="70" cy="53" rx="4" ry="2.5" fill="#FF8A8A" opacity="0.6"/></svg>`
    }
  ];

  function renderizarMascotes() {
    mascotsGrid.innerHTML = "";

    mascotes.forEach(mascote => {
      const isSelected = mascote.id === mascoteSelecionadoId;

      const card = document.createElement("div");
      card.className = `mascot-card ${isSelected ? "selected" : ""}`;
      card.dataset.id = mascote.id;

      card.innerHTML = `
        <div class="svg-container">${mascote.svg}</div>
        <span class="mascot-name">${mascote.nome}</span>
      `;

      card.addEventListener("click", () => selecionarMascote(mascote.id));
      mascotsGrid.appendChild(card);
    });

    atualizarEstadoBotao();
  }

  function selecionarMascote(id) {
    mascoteSelecionadoId = id;

    document.querySelectorAll(".mascot-card").forEach(card => {
      if (card.dataset.id === id) {
        card.classList.add("selected");
      } else {
        card.classList.remove("selected");
      }
    });

    atualizarEstadoBotao();
  }

  function atualizarEstadoBotao() {
    if (mascoteSelecionadoId) {
      btnConfirmar.removeAttribute("disabled");
    } else {
      btnConfirmar.setAttribute("disabled", "true");
    }
  }

  // Grava o mascote escolhido e redireciona para a página inicial em HTML/
  btnConfirmar.addEventListener("click", () => {
    if (!mascoteSelecionadoId) return;

    const mascoteObjeto = mascotes.find(m => m.id === mascoteSelecionadoId);

    if (mascoteObjeto) {
      localStorage.setItem("buswork_mascote_id", mascoteObjeto.id);
      localStorage.setItem("buswork_mascote_nome", mascoteObjeto.nome);
      localStorage.setItem("buswork_mascote_svg", mascoteObjeto.svg);
    }

    window.location.href = "06_tela_inicial_2.html";
  });

  if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
      window.location.href = "06_tela_inicial_2.html";
    });
  }

  renderizarMascotes();
});