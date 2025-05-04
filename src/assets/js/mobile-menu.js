document.addEventListener('click', e => {
    const toggle = e.target.closest('#mobile-menu-button');
    if (!toggle) return;                 // nicht der Burger? -> raus
  
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
    menu.hidden = !menu.classList.contains('open');
  
    // Icon tauschen (bars ↔︎ times)
    const icon = toggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
  
  /* Drawer schließt beim Link-Klick */
  document.addEventListener('click', e => {
    const link = e.target.closest('.mobile-menu a');
    if (!link) return;
  
    const menu = document.getElementById('mobile-menu');
    menu.classList.remove('open');
    menu.hidden = true;
  
    const icon = document.querySelector('#mobile-menu-button i');
    icon?.classList.add('fa-bars');
    icon?.classList.remove('fa-times');
  });