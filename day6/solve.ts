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

const getNumberOfWays = (time: number, record: number) => {
  let numberOfWays = 0;

  for (let i = 0; i <= time; i++) {
    const acceleration = time - i;
    const distance = acceleration * i;

    if (distance > record) {
      numberOfWays++;
    }
  }

  return numberOfWays;
};

const part1 = (_input: string[]) => {
  const races = getRaces(_input);
  const result = [];

  races.forEach(([time, record]) => {
    result.push(getNumberOfWays(time, record));
  });

  return result.reduce((a, b) => a * b, 1);
};

const part2 = (_input: string[]) => {
  const [time, record] = _input.map((s) => Number(getNumbers(s).join('')));

  return getNumberOfWays(time, record);
};

solve({ part1, test1: 288, part2, test2: 71503, parser: parseLines() });
