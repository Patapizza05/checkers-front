export class MaterialColors {

  private text(color: string): string { return color+'-text'; }

  private get white(): string { return 'white'; }
  private get grey_lighten2(): string { return 'grey lighten-2'; }

  private get red(): string { return 'red'; }
  private get redText(): string { return this.text(this.red); }

  private get blue(): string { return 'blue'; }
  private get blueText(): string { return this.text(this.blue) }

  get navbar_background(): string { return this.red; }

  private get transparent_blue(): string { return 'possible-blue'; }
  private get transparent_red(): string { return 'possible-red'; }

  get player_top_white(): string { return this.red; }
  get player_bottom_black(): string { return this.blue; }
  get player_top_white_possible_cells(): string { return this.transparent_red; }
  get player_bottom_black_possible_cells(): string { return this.transparent_blue; }

  get light_cells(): string { return this.white; }
  get dark_cells(): string { return this.grey_lighten2; }

  get movable_pawn(): string { return 'hoverable'; }

}
