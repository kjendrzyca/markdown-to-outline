const fs = require('fs')
const path = require('path')
const toJson = require('./mapToJson')
const toOutline = require('./mapToOutline')

const { argv } = process

const filepath = path.resolve(process.cwd(), argv[2])
const outputPath = path.resolve(process.cwd(), `${argv[2]}.output`)

const mdFile = fs.readFileSync(filepath)

const jsonFile = toJson(mdFile)
// fs.writeFileSync(`${outputPath}.json`, JSON.stringify(jsonFile, null, 2))

const outlineFile = toOutline(jsonFile)
fs.writeFileSync(outputPath, outlineFile)
