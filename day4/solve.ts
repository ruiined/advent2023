import { parseLines, solve } from '../utils';

const part1 = (_input: string[]) => {
  return _input.reduce((acc, card) => {
    const [_, winningNumbers, myNumbers] = card
      .split(/[:|]/)
      .map((c) => c.trim().split(' ').filter(Boolean));

    let wins = 0;

    winningNumbers.forEach((n) => {
      if (myNumbers.includes(n)) {
        wins++;
      }
    });

    if (wins) {
      const points = Array.from({ length: wins }).map((_, i) => Math.pow(2, i));
      acc += points.at(-1);
    }

    return acc;
  }, 0);
};

const part2 = (_input: string[]) => {
  return 0;
};

solve({ part1, test1: 13, part2, test2: 999, parser: parseLines() });
