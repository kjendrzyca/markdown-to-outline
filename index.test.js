// eslint-disable-next-line import/no-unresolved
const fs = require('fs')
const fromMarkdown = require('mdast-util-from-markdown')
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

  console.log(actual)

  expect(actual).toEqual(output)
})

it(`should map all levels`, () => {
  const { input, output } = readTestData('4-all-levels')

  const actual = toJson(mapToJson(input))

  console.log(actual)

  expect(actual).toEqual(output)
})

it(`should properly map a list`, () => {
  const { input, output } = readTestData('5-list')

  const actual = toJson(mapToJson(input))

  console.log(actual)

  expect(actual).toEqual(output)
})

it(`should map a book snapshot`, () => {
  const input = fs.readFileSync(`./testData/eat-that-frog.md`)

  const actual = toJson(mapToJson(input))

  expect(actual).toMatchSnapshot()
})

it.skip(`should not miss any elements`, () => {
  const input = fs.readFileSync(`./testData/eat-that-frog.md`)

  const tree = fromMarkdown(input)

  const allLines = []
  tree.children.forEach((element) => {
    if (!element.children) {
      allLines.push(element.value)
    } else if (element.type === 'list') {
      // console.log('LIST', element.children[0])
      const listElements = element.children.map((child) => child.children[0].children[0].value)

      allLines.push(...listElements)
    } else {
      allLines.push(element.children[0].value)
    }
  })

  // console.log(JSON.stringify(tree, null, 2))
  // console.log('===')
  console.log(allLines)
  console.log(allLines.length)
  // console.log(tree.children.length)

  const actual = toJson(mapToJson(input))

  console.log(actual)

  // expect(actual).toMatchSnapshot()
})
