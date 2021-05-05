import { badWordRegularList } from './bad-word-library';

export class BadWordParser {
  public static checkMessage(text: string): string[] {
    return text.split(' ').filter(this.isBadWord);
  }

  private static isBadWord(word: string): boolean {
    return badWordRegularList.some((regular) => RegExp(regular).test(word));
  }
}
