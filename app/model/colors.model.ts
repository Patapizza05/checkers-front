export class MaterialColors {

  private text(color: string): string { return color+'-text'; }
  private badge(color: string): string { return 'badge-'+color; }
  private possible_move(color: string): string { return 'border-opacity-'+color; }

  private get white(): string { return 'white'; }
  private get grey_lighten2(): string { return 'grey lighten-2'; }

  private get red(): string { return 'red'; }
  private get redText(): string { return this.text(this.red); }

  private get blue(): string { return 'blue'; }
  private get blueText(): string { return this.text(this.blue) }

  get navbar_background(): string { return this.red; }
  get navbar_background_as_text(): string { return this.text(this.red); }

  private get transparent_blue(): string { return 'possible-blue'; }
  private get transparent_red(): string { return 'possible-red'; }


  private _player_top_white: string = this.red;
  private _player_bottom_black: string = this.blue;
  get player_top_white(): string { return this._player_top_white }
  set player_top_white(color: string) {
    if (this.player_bottom_black != color) {
      this._player_top_white = color;
    }
  }
  get player_bottom_black(): string { return this._player_bottom_black }
  set player_bottom_black(color: string) {
    if (this.player_top_white != color) {
      this._player_bottom_black = color;
    }
  }

  get player_top_white_text(): string { return this.text(this.player_top_white); }
  get player_bottom_black_text(): string { return this.text(this.player_bottom_black); }
  get neutral_player_color_text(): string { return 'grey-text'; }

  get player_top_white_text_on_player_background(): string { return this.text(this.white); }
  get player_bottom_black_text_on_player_background(): string { return this.text(this.white); }

  get badge_player_bottom_black(): string { return this.badge(this.player_bottom_black); }
  get badge_player_top_white(): string { return this.badge(this.player_top_white); }
  get player_top_white_possible_cells(): string { return this.possible_move(this.player_top_white); }
  get player_bottom_black_possible_cells(): string { return this.possible_move(this.player_bottom_black); }

  get light_cells(): string { return this.white; }
  get dark_cells(): string { return this.grey_lighten2; }

  get movable_pawn(): string { return 'hoverable'; }

  get play_button_background(): string { return this.white; }
  get play_button_color(): string { return this.text(this.blue); }

  get delete_button_background(): string { return this.white; }
  get delete_button_color(): string { return 'grey-text'; }

  get player_info_text_not_turn(): string { return 'grey-text text-darken-4'; }

  colors : string[] =
    [
      'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green',
      'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'
    ]
}
