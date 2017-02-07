export class Vocabulary {

  get games(): string { return 'Games'; }
  get new_game(): string { return 'New'; }

  get debug(): string { return 'Debug'; }
  get skip(): string { return 'Skip' ; }

  wins(name: string): string {
    return name + ' wins!';
  }
}
