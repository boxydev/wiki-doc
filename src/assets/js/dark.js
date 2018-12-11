class Dark {
    constructor() {
        let body = document.querySelector('body');
        let switchThemeElement = document.getElementById('switch-theme');
        let currentTheme = localStorage.getItem('theme');
        let reverseCurrentTheme = 'light' === currentTheme ? 'dark' : 'light';

        if (currentTheme) {
            body.classList.add(currentTheme);
            switchThemeElement.innerHTML = 'Switch to ' + reverseCurrentTheme;
        }

        switchThemeElement.addEventListener('click', function () {
            if (body.classList.contains('dark')) {
                switchThemeElement.innerHTML = 'Switch to dark';
                body.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            } else {
                switchThemeElement.innerHTML = 'Switch to light';
                body.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            }
        })
    }
}

module.exports = Dark
