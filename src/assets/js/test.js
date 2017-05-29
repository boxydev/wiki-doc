class Test {
    constructor() {
        // We can handle event without problem
        document.body.addEventListener('click', function () {
            console.log('Client works !');
        })
    }
}

module.exports = Test