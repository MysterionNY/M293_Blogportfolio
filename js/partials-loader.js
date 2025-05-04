document.addEventListener('DOMContentLoaded', () => {
    loadPartial('header', 'header.html');
    loadPartial('footer', 'footer.html');
  });
  
  function loadPartial(targetId, url) {
    fetch(url)
      .then(resp => resp.text())
      .then(html => {
        let container = document.getElementById(targetId);
        if (!container) {
          container = document.createElement('div');
          container.id = targetId;
          document.body.prepend(container);
          if (targetId === 'footer') document.body.append(container);
        }
        container.outerHTML = html; 
      })
      .catch(console.error);
  }
  