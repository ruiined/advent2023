import { min } from 'lodash';
import { parseLines, solve } from '../utils';

// destination range start, source range start, range length

const part1 = (_input: string[]) => {
  const seeds = _input[0].split(' ').slice(1).map(Number);

  const maps = _input?.slice(2).reduce((acc, curr) => {
    if (curr?.endsWith('map:')) {
      acc.push([]);
    } else if (curr) {
      acc[acc.length - 1]?.push(curr.split(' ').map(Number));
    }

    return acc;
  }, []);

  const locations = [];

  seeds.forEach((seed) => {
    let location = seed;

    maps.forEach((map) => {
      let found = false;

      map.forEach((line: number[]) => {
        const [destination, source, length] = line;
        const isRange = location >= source && location <= source + length;

        if (!isRange || found) return;

        const offset = destination - source;
        location += offset;
        found = true;
      });
    });

    locations.push(location);
  });

  return min(locations);
};

const part2 = (_input: string[]) => {
  return 0;
};

solve({ part1, test1: 35, part2, test2: 999, parser: parseLines() });
