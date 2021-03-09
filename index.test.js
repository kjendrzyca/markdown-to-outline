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

  console.log(actual)

  expect(actual).toEqual(output)
})
