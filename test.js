function parent(taka) {
    console.log('Parent F')

    function child() {
        console.log('child f')
        return taka * 2;
    }

    return child;
}



function greet(name) {
    return function (message) {
        return `${message}, ${name}!`;
    };
}

// Using the higher-order function
const g = greet("Tanvir")
const n = g('Hello')
console.log(n)


function rec(n) {
    if (n === 0) {
        console.log('off')
        return
    }

    console.log(n - 1)
    rec(n - 1)
}

rec(11)