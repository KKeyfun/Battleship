/**
 * @jest-environment jsdom
 */

import { checkDuplicates } from './gameController';
import player from './createPlayer';
import { checkFit, placeShipsAuto } from './placeShip';

const ships = [
  ['Carrier', 5],
  ['Battleship', 4],
  ['Destroyer', 3],
];

describe('Check proper player object is created', () => {
  const playerTwo = player(ships, 'p2');
  test('Check if player has all ships', () => {
    expect(playerTwo.ships.Carrier.name).toBe(ships[0][0]);
    expect(playerTwo.ships.Battleship.name).toBe(ships[1][0]);
    expect(playerTwo.ships.Destroyer.name).toBe(ships[2][0]);
  });
  test('Check if board is proper size', () => {
    expect(playerTwo.gameBoard.board.length).toBe(10);
    expect(playerTwo.gameBoard.board[9].length).toBe(10);
  });
});

test('Test checkfit', () => {
  expect(checkFit(0, 0, 5, 'Y')).toBe(true);
  expect(checkFit(9, 9, 2, 'X')).toBe(false);
});

test('Check duplicates exist in array', () => {
  expect(checkDuplicates([[1, 2], [2, 3], [3, 4]], 2, 3)).toBe(true);
  expect(checkDuplicates([[1, 2], [2, 3], [3, 4]], 1, 1)).toBe(false);
});

test('Test auto placement', () => {
  const robot = player(ships, 'robot');
  placeShipsAuto(robot);
  expect(robot.ships.Carrier.coordinates.length).toBe(5);
  expect(robot.ships.Battleship.coordinates.length).toBe(4);
  expect(robot.ships.Destroyer.coordinates.length).toBe(3);
});

test('t', () => {
  expect([1, 2]).toEqual([1, 2]);
});
