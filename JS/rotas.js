// rotas.js
document.addEventListener('DOMContentLoaded', () => {
  // Controle do Menu Mobile
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    if(sidebar) sidebar.classList.remove('-translate-x-full');
    if(sidebarOverlay) sidebarOverlay.classList.remove('hidden');
  }

  function closeSidebar() {
    if(sidebar) sidebar.classList.add('-translate-x-full');
    if(sidebarOverlay) sidebarOverlay.classList.add('hidden');
  }

  if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openSidebar);
  if (closeSidebarBtn) closeSidebarBtn.addEventListener('click', closeSidebar);
  if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

  // Lógica de Rotas e Horários
  const select = document.getElementById('linhaSelect');
  const container = document.getElementById('horariosContainer');

  // Verifica se o objeto HORARIOS_BUSWORK existe
  if (typeof HORARIOS_BUSWORK === 'undefined') {
    container.innerHTML = '<p class="text-red-500">Erro: Base de dados de horários não encontrada.</p>';
    return;
  }

  // Preencher o Select com as linhas disponíveis
  for (const [key, rota] of Object.entries(HORARIOS_BUSWORK)) {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = rota.nome;
    select.appendChild(option);
  }

  // Função para renderizar os blocos de horários
  function renderHorarios(chaveLinha) {
    const rota = HORARIOS_BUSWORK[chaveLinha];
    container.innerHTML = ''; // Limpa o container

    const periodos = [
      { id: 'diasUteis', titulo: 'Dias Úteis', icone: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
      { id: 'sabados', titulo: 'Sábados', icone: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
      { id: 'domingosEFeriados', titulo: 'Domingos e Feriados', icone: 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z' }
    ];

    periodos.forEach(periodo => {
      const dados = rota[periodo.id];
      if (!dados) return;

      const terminal = dados.terminalUrbano || [];
      const bairro = dados.bairro || [];

      let htmlTerminal = terminal.length > 0 
        ? terminal.map(h => `<span class="bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium text-center shadow-sm">${h}</span>`).join('')
        : `<span class="text-gray-500 text-sm italic">Sem operação</span>`;

      let htmlBairro = bairro.length > 0 
        ? bairro.map(h => `<span class="bg-gray-800 border border-gray-700 px-3 py-1.5 rounded-lg text-sm font-medium text-center shadow-sm">${h}</span>`).join('')
        : `<span class="text-gray-500 text-sm italic">Sem operação</span>`;

      const bloco = `
        <div class="bg-[#0D1117] border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
          <div class="bg-gray-900 px-5 py-3 border-b border-gray-800 flex items-center space-x-2">
            <svg class="w-5 h-5 text-[#FFD600]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="${periodo.icone}"></path></svg>
            <h3 class="font-bold text-lg text-white">${periodo.titulo}</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-800">
            <div class="bg-[#0D1117] p-5">
              <div class="flex items-center space-x-2 mb-4">
                <span class="w-2 h-2 rounded-full bg-[#FFD600]"></span>
                <h4 class="font-semibold text-gray-300 uppercase tracking-wider text-xs">Saída: Terminal Urbano</h4>
              </div>
              <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                ${htmlTerminal}
              </div>
            </div>
            <div class="bg-[#0D1117] p-5">
              <div class="flex items-center space-x-2 mb-4">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span>
                <h4 class="font-semibold text-gray-300 uppercase tracking-wider text-xs">Saída: Bairro</h4>
              </div>
              <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-2">
                ${htmlBairro}
              </div>
            </div>
          </div>
        </div>
      `;
      container.insertAdjacentHTML('beforeend', bloco);
    });
  }

  // Renderiza a primeira linha ao carregar
  if (select.options.length > 0) {
    renderHorarios(select.value);
  }

  // Atualiza ao mudar a linha no Select
  select.addEventListener('change', (e) => {
    renderHorarios(e.target.value);
  });
});