import { parseLines, solve } from '../utils';

const getNumbers = (str: string) => str.split(' ').filter(Number);

const getRaces = (arr: string[]) => {
  const [times, distances] = arr.map((s) => getNumbers(s));
  const races = [];

  for (let i = 0; i < times.length; i++) {
    races.push([times[i], distances[i]]);
  }

  return races;
};

const part1 = (_input: string[]) => {
  const races = getRaces(_input);
  const result = [];

  races.forEach(([time, record]) => {
    let numberOfWays = 0;

    for (let i = 0; i <= time; i++) {
      const acceleration = time - i;
      const distance = acceleration * i;

      if (distance > record) {
        numberOfWays++;
      }
    }

    result.push(numberOfWays);
  });

  return result.reduce((a, b) => a * b, 1);
};

const part2 = (_input: string[]) => {
  return 0;
};

solve({ part1, test1: 288, part2, test2: 999, parser: parseLines() });
