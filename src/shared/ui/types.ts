interface IBetData {
  trx_url: string;
  time: {
    date: string;
    time: string;
  };
  ava_address: any;
  //game_url: string,
  game_name: string;
  player_address: string;
  player_name: string;
  wager: number;
  multiplier: number;
  profit: number;
  token: string;
}
