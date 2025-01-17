const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Hola Angel: ', (x) => {
    rl.question('Segundo número: ', (y) => {
        const numX = Number(x);
        const numY = Number(y);

        if (isNaN(numX) || isNaN(numY)) {
            console.log('Por favor, ingresa valores numéricos.');
        } else {
            console.log(`El resultado es: ${numX * numY}`);
        }

        rl.close();
    });
});
