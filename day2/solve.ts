import { sum } from 'lodash';
import { parseLines, solve } from '../utils/typescript';

const possibleCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const getSets = (game: string): string[] => game.split(/[:;]/).slice(1);

function part1(_input: string[]): number {
  const ids = _input
    .map((game, id) => {
      const sets = getSets(game);

      const isValid = sets.every((set) =>
        set.split(',').every((cubes) => {
          const [number, colour] = cubes.trim().split(' ');

          return possibleCubes[colour] >= number;
        }),
      );

      return isValid ? id + 1 : null;
    })
    .filter((i) => !!i);

  return sum(ids);
}

function part2(_input: string[]) {
  const games = _input.map((game) => {
    const sets = getSets(game);
    const cubes = sets.map((set) => set.split(',').map((s) => s.trim())).flat();

    const { red, green, blue } = cubes.reduce(
      (acc, curr) => {
        const [number, colour] = curr.trim().split(' ');

        if (acc[colour] === null || acc[colour] < Number(number)) {
          acc[colour] = Number(number);
        }

        return acc;
      },
      {
        red: null,
        green: null,
        blue: null,
      },
    );

    return red * green * blue;
  });

  return sum(games);
}

solve({ part1, test1: 8, part2, test2: 2286, parser: parseLines() });
