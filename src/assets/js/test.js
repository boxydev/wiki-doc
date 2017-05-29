class Test {
    constructor() {
        // We can handle event without problem
        document.body.addEventListener('click', function () {
            alert('Client works !');
        })
    }
}

module.exports = Test