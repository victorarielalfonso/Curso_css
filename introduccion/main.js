// while
var cantidad = parseInt(prompt("Intro"))
let i = 1;
document.write(`Tabla del ${cantidad} <br>`);

while(i <=10){
   document.write(`${cantidad} * ${i} = ${cantidad * i}<br>`)
   i++;
}
//for
var x = parseInt(prompt("Intro"))
document.write(`Tabla del ${x} <br>`);
for(i=1; i<=10; i++ ){
   var res = x * i 
document.write(`${x} * ${i} = ${res} <br>`)
}
