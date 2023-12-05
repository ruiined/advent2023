import { indexOf, sum } from 'lodash';
import { parseLines, solve } from '../utils/typescript';

function part1(_input: string[]) {
  const numbers = [];

  _input.map((line) => {
    const digits = line
      .split('')
      .map((str) => Number(str))
      .filter((num) => !!num);

    const number = digits[0] * 10 + digits.at(-1);

    numbers.push(number);
  });

  return sum(numbers);
}

const stringNumbers = [
  'one',
  'two',
  'three',
  'four',
  'five',
  'six',
  'seven',
  'eight',
  'nine',
];

const sortCharsByIdx = (arr: string[]) => {
  const result = [];

  arr.forEach((str) =>
    str
      .split('')
      .forEach((char, i) => (result[i] = [...(result[i] ?? ''), char])),
  );

  return result;
};

const findMatch = ({ arr, reverse }: { arr: string[]; reverse?: boolean }) => {
  const lastIndex = arr.length - 1;
  const stringNumbersByIdx = reverse
    ? sortCharsByIdx(stringNumbers).reverse()
    : sortCharsByIdx(stringNumbers);
  const matches = [];
  let digit: number;
  let i: number = reverse ? lastIndex : 0;

  arr.forEach((char) => {
    if (digit) return;

    const currentMatch = matches.join('');

    if (stringNumbers.includes(currentMatch)) {
      digit = indexOf(stringNumbers, currentMatch) + 1;
      return;
    }

    if (!!Number(char)) {
      digit = Number(char);
      return;
    }

    if (stringNumbersByIdx[i]?.includes(char)) {
      matches.push(char);
      reverse ? i-- : i++;
      return;
    }

    reverse ? (i = lastIndex) : (i = 0);
    matches.pop();
  });

  return digit ?? 0;
};

function part2(_input: string[]) {
  const numbers = _input?.map((line) => {
    const arr = line.split('');
    const firstDigit = findMatch({ arr });
    const lastDigit = findMatch({ arr: arr.reverse(), reverse: true });

    return firstDigit * 10 + lastDigit;
  });
  console.log({ _input, numbers });
  return sum(numbers);
}

solve({ part1, test1: 142, part2, test2: 281, parser: parseLines() });
