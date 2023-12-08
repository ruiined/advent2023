import { sum } from 'lodash';
import { parseLines, solve } from '../utils/typescript';

const symbolRegex = /[-’/`~!#*$@_%+=,^&(){}[\]|;:”<>?\\]/g;

function part1(_input: string[]) {
  const symbolCoords = _input.reduce((acc, line, colIdx) => {
    line.split('').forEach((char, idx) => {
      if (symbolRegex.test(char)) {
        acc[colIdx] = acc[colIdx] || [];
        acc[colIdx].push(idx);
      }
    });
    return acc;
  }, {});

  const numbers = _input.reduce((acc, line, colIdx) => {
    const arr = line.split('');
    const digits: string[] = [];

    const touches = (n: number) =>
      symbolCoords[colIdx]?.includes(n) ||
      symbolCoords[colIdx - 1]?.includes(n) ||
      symbolCoords[colIdx + 1]?.includes(n);

    arr.forEach((s, idx) => {
      if (/[0-9]/.test(s)) {
        digits.push(s);
        if (idx !== arr.length - 1) return;
      }

      if (!digits.length) return;

      const numberIdxs = digits.map((_, i) => i + idx - digits.length);
      const touchesSymbol = numberIdxs.some(
        (n) => touches(n) || touches(n - 1) || touches(n + 1),
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

function part2(_input: string[]) {
  return 'part2';
}

solve({ part1, test1: 4361, part2, parser: parseLines() });
