import { sum } from 'lodash';
import { parseLines, solve } from '../utils';

const getCardPoints = (wins: number): number => {
  if (!wins) return 0;

  return Array.from({ length: wins })
    .map((_, i) => Math.pow(2, i))
    .at(-1);
};

const getWinCount = (card: string): number => {
  const [_, winningNumbers, myNumbers] = card
    .split(/[:|]/)
    .map((c) => c.trim().split(' ').filter(Boolean));

  return winningNumbers.reduce((acc, n) => {
    if (myNumbers.includes(n)) {
      acc++;
    }
    return acc;
  }, 0);
};

const part1 = (_input: string[]) => {
  return _input.reduce((acc, card) => {
    const wins = getWinCount(card);
    acc += getCardPoints(wins);

    return acc;
  }, 0);
};

const part2 = (_input: string[]) => {
  const cards = _input.reduce((acc, card, idx) => {
    const wins = getWinCount(card);

    Array.from({ length: wins }).forEach((_, i) => {
      const nextIdx = idx + i + 1;
      acc[nextIdx] = acc[nextIdx] || 1;
      acc[nextIdx] += acc[idx] ?? 1;
    });

    if (!acc[idx]) {
      acc[idx] = 1;
    }

    return acc;
  }, []);

  return sum(cards);
};

solve({ part1, test1: 13, part2, test2: 30, parser: parseLines() });
