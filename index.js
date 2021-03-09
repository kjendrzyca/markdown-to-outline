const fs = require('fs')
const path = require('path')
const toJson = require('./mapToJson')
const toOutline = require('./mapToOutline')

const { argv } = process

const filepath = path.resolve(process.cwd(), argv[2])

const mdFile = fs.readFileSync(filepath)

const outlineFile = toOutline(toJson(mdFile))
const outputPath = path.resolve(process.cwd(), `${argv[2]}.output`)

fs.writeFileSync(outputPath, outlineFile)
