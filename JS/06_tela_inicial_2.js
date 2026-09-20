document.addEventListener('DOMContentLoaded', () => {
  // 1. Controle do Menu Mobile (Sidebar)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeSidebarBtn = document.getElementById('close-sidebar-btn');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  function openSidebar() {
    sidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('hidden');
  }

  function closeSidebar() {
    sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
  }

  if (mobileMenuBtn && closeSidebarBtn && sidebar && sidebarOverlay) {
    mobileMenuBtn.addEventListener('click', openSidebar);
    closeSidebarBtn.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  // 2. Mock de Dados do Usuário
  const userNameDisplay = document.getElementById('userNameDisplay');
  if (userNameDisplay) {
    // Você pode puxar isso do localStorage ou banco de dados no futuro
    userNameDisplay.textContent = 'Olá, BusWorker!';
  }

  // 3. Inserção do Mascote (SVG)
  const userAvatarContainer = document.getElementById('userAvatarContainer');
  const mapMascotMarker = document.getElementById('mapMascotMarker');

  // SVG de exemplo para o mascote
  const mascotSVG = `
    <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="45" fill="#FFD600" />
      <circle cx="35" cy="40" r="8" fill="#121212" />
      <circle cx="65" cy="40" r="8" fill="#121212" />
      <path d="M 35 65 Q 50 80 65 65" fill="none" stroke="#121212" stroke-width="6" stroke-linecap="round" />
    </svg>
  `;

  if (userAvatarContainer) {
    userAvatarContainer.innerHTML = mascotSVG;
  }
  
  if (mapMascotMarker) {
    mapMascotMarker.innerHTML = mascotSVG;
  }
});