// Fonction pour mettre à jour la classe active de la navbar
function updateActiveNav() {
    const navLinks = document.querySelectorAll('nav ul li a');

    const currentHash = window.location.hash;
    Document.getElementById(currentHash+'navbas').className += 'activenavbas';


    navLinks.forEach(link => {
        const linkHash = link.getAttribute('href');
        if (linkHash === currentHash) {
            link.parentElement.classList.add('active');
        } else {
            link.parentElement.classList.remove('active');
        }
    });
}

// Exécutez la fonction au chargement de la page et lorsque le hachage change
window.addEventListener('load', updateActiveNav);
window.addEventListener('hashchange', updateActiveNav);