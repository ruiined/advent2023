import { keys, sum } from 'lodash';
import { parseLines, solve } from '../utils/typescript';

const possibleCubes = {
  red: 12,
  green: 13,
  blue: 14,
};

function part1(_input: string[]): number {
  const ids = _input
    .map((game, id) => {
      const sets = game.split(/[:;]/).slice(1);

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
  return 'part2';
}

solve({ part1, test1: 8, part2, test2: '', parser: parseLines() });
