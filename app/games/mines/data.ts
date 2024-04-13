export enum Tile {
  Closed,
  Selected,
  SelectedShaking,
  Coin,
  Bomb
}

export const initialGameField: Tile[] = [
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed,
  Tile.Closed
]

export const initialPickedTiles = [
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
  false
]

export const maxReveal = [
  0, 24, 21, 17, 14, 12, 10, 9, 8, 7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1,
  1
]
