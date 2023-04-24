import Regex from "./Regex";

enum TokenType {
  NUM = "NUM",
  MINUS = "MINUS",
  PLUS = "PLUS",
  SLASH = "SLASH",
  STAR = "STAR",
  EOF = " EOF",
}

class Token {
  public type: TokenType; // tipo do token
  public lexeme: string; // valor do token

  constructor(type: TokenType, value: string) {
    this.type = type;
    this.lexeme = value;
  }

  public toString(): string {
    return `Token [type=${this.type}, lexeme=${this.lexeme}]`;
  }
}

function scan(input: string): Token[] {
  const lines = input.split("\n");
  const tokens: Token[] = [];

  for (const line of lines) {
    const lexeme = line.trim();

    if (lexeme === "") {
      continue;
    }

    if (Regex.isNum(lexeme)) {
      tokens.push(new Token(TokenType.NUM, lexeme));
    } else if (Regex.isOP(lexeme)) {
      switch (lexeme) {
        case "+":
          tokens.push(new Token(TokenType.PLUS, lexeme));
          break;
        case "-":
          tokens.push(new Token(TokenType.MINUS, lexeme));
          break;
        case "*":
          tokens.push(new Token(TokenType.STAR, lexeme));
          break;
        case "/":
          tokens.push(new Token(TokenType.SLASH, lexeme));
          break;
        default:
          throw new Error(`Unexpected character: ${lexeme}`);
      }
    } else {
      throw new Error(`Unexpected character: ${lexeme}`);
    }
  }

  return tokens;
}

function operar(tokens: Token[]): number {
  let pilha: number[] = [];

  tokens.forEach(function (token) {
    if (Regex.isNum(token.lexeme)) {
      pilha.push(parseFloat(token.lexeme));
    } else {
      let b: number = pilha.pop() as number;
      let a: number = pilha.pop() as number;
      switch (token.type) {
        case TokenType.PLUS:
          pilha.push(a + b);
          break;
        case TokenType.MINUS:
          pilha.push(a - b);
          break;
        case TokenType.STAR:
          pilha.push(a * b);
          break;
        case TokenType.SLASH:
          pilha.push(a / b);
          break;
        default:
          throw new Error("Operador inválido: " + token.lexeme);
      }
    }
  });
  return pilha.pop() as number;
}

let fs = require("fs");
let input = fs.readFileSync("Calc1.stk", "utf-8");

let tokens = scan(input);

tokens.forEach((token) => {
  console.log(token.toString());
});

const resultado = operar(tokens);

console.log("Saída: " + resultado);
