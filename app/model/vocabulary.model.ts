export class Vocabulary {

  get games(): string { return 'Games'; }
  get new_game(): string { return 'New'; }
  get new_game_long(): string { return 'New game'; }
  get game(): string { return 'Game'; }

  get debug(): string { return 'Debug'; }
  get skip(): string { return 'Skip' ; }
  get retry(): string { return 'Retry'; }
  get edit(): string { return 'Edit'; }

  get play(): string { return 'Play'; }

  get pawns_no_caps(): string { return 'pawns'}

  wins(name: string): string {
    return name + ' wins!';
  }
}
