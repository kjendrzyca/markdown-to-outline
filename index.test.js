// eslint-disable-next-line import/no-unresolved
const fs = require('fs')
const mapToJson = require('./mapToJson')

const readTestData = (filePrefix) => {
  const input = fs.readFileSync(`./testData/${filePrefix}-input.md`)
  const output = fs.readFileSync(`./testData/${filePrefix}-output.json`)
  return {
    input,
    output: output.toString(),
  }
}

const toJson = (data) => JSON.stringify(data, null, 2)

it(`should map simple markdown`, () => {
  const { input, output } = readTestData('1-simple')

  const actual = toJson(mapToJson(input))

  expect(actual).toEqual(output)
})

it(`should map simple markdown without first header`, () => {
  const { input, output } = readTestData('1-simple-without-first-header')

  const actual = toJson(mapToJson(input))

  expect(actual).toEqual(output)
})

it(`should map nested markdown (h2 level)`, () => {
  const { input, output } = readTestData('2-nested')

  const actual = toJson(mapToJson(input))

  expect(actual).toEqual(output)
})

it(`should map nested markdown without first header (h2 level)`, () => {
  const { input, output } = readTestData('2-nested-without-first-header')

  const actual = toJson(mapToJson(input))

  expect(actual).toEqual(output)
})

it(`should map nested markdown (h3 level)`, () => {
  const { input, output } = readTestData('3-nested-h3')

  const actual = toJson(mapToJson(input))

  expect(actual).toEqual(output)
})

it(`should map all levels`, () => {
  const { input, output } = readTestData('4-all-levels')

  const actual = toJson(mapToJson(input))

  expect(actual).toEqual(output)
})

it(`should map a list`, () => {
  const { input, output } = readTestData('5-list')

  const actual = toJson(mapToJson(input))

  expect(actual).toEqual(output)
})

it(`should map a note`, () => {
  // A header note becomes a new paragraph inside.
  // A paragraph note is appended to the paragrap with new line character.
  const { input, output } = readTestData('6-note')

  const actual = toJson(mapToJson(input))

  expect(actual).toEqual(output)
})

it(`should map an image and a link`, () => {
  const { input, output } = readTestData('7-images-links')

  const actual = toJson(mapToJson(input))

  expect(actual).toEqual(output)
})

it(`should map a book snapshot`, () => {
  const input = fs.readFileSync(`./testData/eat-that-frog.md`)

  const actual = toJson(mapToJson(input))

  expect(actual).toMatchSnapshot()
})
