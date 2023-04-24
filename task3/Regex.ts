export default class Regex {
  private static numRegex = /^\d+(\.\d+)?$/;
  private static opRegex = /^[\+\-\*\/]$/;

  public static isNum(lexeme: string): boolean {
    return this.numRegex.test(lexeme);
  }
  public static isOP(lexeme: string): boolean {
    return this.opRegex.test(lexeme);
  }
}
