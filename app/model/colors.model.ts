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

  get player_top_white_text(): string { return this.text(this.player_top_white); }
  get player_bottom_black_text(): string { return this.text(this.player_bottom_black); }
  get neutral_player_color_text(): string { return 'grey-text'; }

  get player_top_white_text_on_player_background(): string { return this.text(this.white); }
  get player_bottom_black_text_on_player_background(): string { return this.text(this.white); }

  get player_top_white_possible_cells(): string { return this.transparent_red; }
  get player_bottom_black_possible_cells(): string { return this.transparent_blue; }
  get badge_player_bottom_black(): string { return 'badge-blue'; }
  get badge_player_top_white(): string { return 'badge-red'; }

  get light_cells(): string { return this.white; }
  get dark_cells(): string { return this.grey_lighten2; }

  get movable_pawn(): string { return 'hoverable'; }

  get play_button_background(): string { return this.white; }
  get play_button_color(): string { return this.text(this.blue); }

  get delete_button_background(): string { return this.white; }
  get delete_button_color(): string { return 'grey-text'; }

  get player_info_text_not_turn(): string { return 'grey-text text-darken-4'; }
}
