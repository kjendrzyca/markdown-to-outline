// eslint-disable-next-line import/no-unresolved
const fs = require('fs')
const mapToJson = require('./mapToJson')

const readTestData = () => {
  const input = fs.readFileSync('./testData/1-simple-input.md')
  const output = fs.readFileSync('./testData/1-simple-output.json')
  return {
    input,
    output: output.toString(),
  }
}

const toJson = (data) => JSON.stringify(data, null, 2)

it(`should map simple markdown to json`, () => {
  const { input, output } = readTestData()

  const actual = mapToJson(input)

  expect(toJson(actual)).toEqual(output)
})
