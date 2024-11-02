document.addEventListener('DOMContentLoaded', () => {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar').innerHTML = data;
            const script = document.createElement('script');
            script.textContent = `
                function toggleMenu() {
                    const navbar = document.querySelector('.navbar');
                    navbar.classList.toggle('active');
                }
            `;
            document.body.appendChild(script);
        });
});
