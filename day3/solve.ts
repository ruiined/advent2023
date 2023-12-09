import { sum, keys, values } from 'lodash';
import { parseLines, solve } from '../utils';

const symbolRegex = /[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g;

const getCoords = (arr: string[], regex: RegExp) => {
  return arr.reduce((acc, row, col) => {
    row.split('').forEach((char, i) => {
      if (regex.test(char)) {
        acc[col] = acc[col] || [];
        acc[col].push(i);
      }
    });
    return acc;
  }, {});
};

function part1(_input: string[]) {
  const symbolCoords = getCoords(_input, symbolRegex);

  const numbers = _input.reduce((acc, row, col) => {
    const arr = row.split('');
    const digits = [];

    arr.forEach((s, idx) => {
      if (/[0-9]/.test(s)) {
        digits.push(s);
        if (idx !== arr.length - 1) return;
      }

      if (!digits.length) return;

      const numberIdxs = digits.map((_, i) => i + idx - digits.length);
      const touchesSymbol = numberIdxs.some((n) =>
        [n - 1, n, n + 1].some((r) =>
          [col - 1, col, col + 1].some((c) => symbolCoords[c]?.includes(r)),
        ),
      );

      if (touchesSymbol) {
        acc.push(parseInt(digits.join('')));
      }

      digits.length = 0;
      return;
    });
    return acc;
  }, []);

  return sum(numbers);
}

const offsets = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const getZones = (x: number, y: number) => {
  return offsets
    .map(([dx, dy]) => [x + dx, y + dy])
    .filter(([x, y]) => x >= 0 && y >= 0);
};

function part2(_input: string[]) {
  const asteriskCoords = getCoords(_input, /[*]/);
  const asteriskZones = keys(asteriskCoords)
    .map((col) =>
      asteriskCoords[col].map((row: number) => ({
        id: `${col}_${row}`,
        coords: getZones(Number(col), row),
      })),
    )
    .flat();

  const numbers = _input.reduce((acc, row, col) => {
    const arr = row.split('');
    const digits = [];

    arr.forEach((s, idx) => {
      if (/[0-9]/.test(s)) {
        digits.push(s);
        if (idx !== arr.length - 1) return;
      }

      if (!digits.length) return;

      const numberIdxs = digits.map((_, i) => [col, i + idx - digits.length]);

      const asteriskNearNumbers = asteriskZones.filter(
        (zone) =>
          zone.coords?.some(
            (c: number[]) =>
              numberIdxs?.some((n) => n[0] === c[0] && n[1] === c[1]),
          ),
      );

      asteriskNearNumbers?.forEach(({ id }) => {
        acc[id] = acc[id] || [];
        acc[id].push(parseInt(digits.join('')));
      });

      digits.length = 0;
    });

    return acc;
  }, {});

  return sum(
    values(numbers)
      .filter((arr: string[]) => arr.length > 1)
      .map((n: number[]) => n.reduce((a, b) => a * b, 1)),
  );
}

solve({ part1, test1: 4361, part2, test2: 467835, parser: parseLines() });
