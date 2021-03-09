const fs = require('fs')
// const fromMarkdown = require('mdast-util-from-markdown')
const mapToOutline = require('./mapToOutline')
// const mapToJson = require('./mapToJson')

const jsonOutput = fs.readFileSync(`./testData/all-levels.json`).toString()
const expectedMarkdownOutput = fs.readFileSync(`./testData/all-levels-outline.md`).toString()

it(`should map json to list`, () => {
  const json = JSON.parse(jsonOutput)

  const actual = mapToOutline(json)

  expect(actual).toEqual(expectedMarkdownOutput)
})
