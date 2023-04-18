

function operar(operacao) {
  let tokens = operacao.split("\n");
  let pilha = [];
  tokens.forEach(function(token) {
    if (!isNaN(token)) {
      pilha.push(parseFloat(token));
    } else {
      let b = pilha.pop();
      let a = pilha.pop();
      switch (token) {
        case "+":
          pilha.push(a + b);
          break;
        case "-":
          pilha.push(a - b);
          break;
        case "*":
          pilha.push(a * b);
          break;
        case "/":
          pilha.push(a / b);
          break;
        default:
          throw new Error("Operador inválido: " + token);
      }
    }
  });
  return pilha.pop();
}


let fs = require("fs");
let input = fs.readFileSync("Calc1.stk", "utf-8");

const resultado = operar(input);

console.log('Saída: ' + resultado);