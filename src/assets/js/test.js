class Test {
    constructor() {
        // We can handle event without problem
        document.getElementById('switch-dark').addEventListener('click', function () {
            let body = document.querySelector('body');

            if (body.classList.contains('dark')) {
                body.classList.remove('dark');
            } else {
                body.classList.add('dark');
            }
        })
    }
}

module.exports = Test
