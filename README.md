# Advent of Code 2023

This repository has some boilerplate, utils and setup for running Advent of Code easily.

## Setup

Log in on advent of code, and copy the `session` cookie to your the `SESSION` env var.

Now run `nvm use` and `yarn install`.

## Running

To fetch inputs for a given day, run `yarn setup [day]`, e.g. `yarn setup 1`.
If run without a day, it'll fetch all days up to now.

By default, `yarn start` runs `yarn typescript` - change this if you want.

This will run tests (if provided), execute your code, and send the solution.
Solutions will be deduped before sending.

## Utils (typescript)

Typescript has some special utils in the `utils` folder. There are:

- `.last` as an extension method on Array. Let's be honest, it should always have been there.
- `printGrid(grid: string[][])` to display a grid.
- `visualisePoints(points: Record<string, Point[]>)`: creates a visual grid with marks at the specified points.
  - For example: `visualisePoints({a: [0, 0], b: [0, 1]})` prints `ab`
- `aStar` is the [A\* algorithm](https://en.wikipedia.org/wiki/A*_search_algorithm)
