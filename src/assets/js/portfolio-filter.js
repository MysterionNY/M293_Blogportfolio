document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.filter-btn');
    const items   = document.querySelectorAll('.portfolio-item');
  
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // aktive Klasse umschalten
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
  
        const filter = btn.dataset.filter;
        items.forEach(item => {
          const match = filter === 'all' || item.dataset.category === filter;
          item.style.display = match ? '' : 'none';
        });
      });
    });
  });
  