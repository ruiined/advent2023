import { indexOf, sum } from 'lodash';
import { parseLines, solve } from '../utils/typescript';

const getDigits = (str: string) => {
  return str
    .split('')
    .map((str) => Number(str))
    .filter((num) => !!num);
};

function part1(_input: string[]) {
  return _input.reduce((acc, line) => {
    const digits = getDigits(line);
    const number = digits[0] * 10 + digits.at(-1);
    return acc + number;
  }, 0);
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

const groupCharsByIdx = (arr: string[]): string[] => {
  return arr.reduce((acc, str) => {
    str.split('').forEach((char, i) => (acc[i] = [...(acc[i] ?? ''), char]));
    return acc;
  }, []);
};

const reverse = (str: string) => str.split('').reverse().join('');

type Props = {
  arr: string[];
  numberChars: string[];
  isReverse?: boolean;
};

const getDigit = ({ arr, numberChars, isReverse }: Props) => {
  const matches = [];
  let n = 0;
  let value = 0;

  const isMatch = (n: number, char: string) => numberChars[n]?.includes(char);

  const isValidMatch = (matches: string[], char: string) =>
    stringNumbers.some((s) =>
      (isReverse ? reverse(s) : s).startsWith([...matches, char].join('')),
    );

  arr.forEach((char) => {
    if (value) return;

    if (!!Number(char)) {
      value = Number(char);
      n = 0;
      return;
    }

    matches.forEach(() => {
      if (!isMatch(n, char) || !isValidMatch(matches, char)) {
        n--;
        matches.shift();
      }
    });

    if (!isMatch(n, char)) return;

    matches.push(char);
    n++;

    const currentMatch = isReverse
      ? [...matches].reverse().join('')
      : matches.join('');

    if (stringNumbers.includes(currentMatch)) {
      value = indexOf(stringNumbers, currentMatch) + 1;
      matches.length = 0;
      n = 0;
    }
  });

  return value;
};

const getMatches = (str: string): number => {
  const arr = str.split('');

  const firstDigit = getDigit({
    arr,
    numberChars: groupCharsByIdx(stringNumbers),
  });

  const lastDigit = getDigit({
    arr: arr.reverse(),
    numberChars: groupCharsByIdx(stringNumbers.map((s) => reverse(s))),
    isReverse: true,
  });

  return firstDigit * 10 + lastDigit;
};

function part2(_input: string[]) {
  const numbers = _input?.map((line) => {
    return getMatches(line);
  });

  return sum(numbers);
}

solve({ part1, test1: 142, part2, test2: 281, parser: parseLines() });
