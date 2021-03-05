const fromMarkdown = require('mdast-util-from-markdown')

// const doc = fs.readFileSync('eat-that-frog.md')
// const doc = fs.readFileSync('simple.md')

module.exports = (markdownDocument) => {
  const tree = fromMarkdown(markdownDocument)
  const allElements = tree.children
  // console.log(allElements)
  // console.log(JSON.stringify(tree, null, 2))

  // THIS DOESN'T WORK, because I would indent h1, when indenting stuff between two h2
  // find indexes between headings with `depth=1` => [0, 10, 20]
  // indent nodes between headings
  // indent nodes after last heading index
  // find indexes between headings with `depth=2` => [4, 8, 12, 18, 22] WRONG

  // GROUPING OPTION
  // find indexes between headings with `depth=1` => [0, 10, 20]
  // reduce and if index is between add to first group
  // if index is between second group, add second group
  // and so on

  const levelOneIndexes = findAllIndexes(tree.children, 1)
  console.log({ levelOneIndexes })

  const finalResult = mapStuff(levelOneIndexes, allElements)

  // console.log(JSON.stringify(finalResult, null, 2))

  return finalResult
}

const findAllIndexes = (array, level) => array.reduce((prev, current, currentIndex) => {
  if (indexPredicate(current, level)) {
    prev.push(currentIndex)
  }
  return prev
}, [])

const indexPredicate = (element, level) => element.type === 'heading' && element.depth === level

const mapStuff = (headingIndexes, elements) => headingIndexes.map((index, indexIterator) => {
  const isFirstGroupIndex = index === 0
  const isLastGroupIndex = index === headingIndexes[headingIndexes.length - 1]
  const isInBetweenGroupIndex = index > 0 && index < headingIndexes[headingIndexes.length - 1]
  const nextIndex = headingIndexes[indexIterator + 1]

  console.log({ isInBetweenGroupIndex, index })

  let group
  if (isFirstGroupIndex) {
    const secondHeaderIndex = headingIndexes[1]
    group = elements.reduce((result, current, currentIndex) => {
      if (currentIndex > 0 && currentIndex < secondHeaderIndex) {
        result.push(sanitizeElement(current))
      }

      return result
    }, [])
  }

  if (isLastGroupIndex) {
    group = elements.reduce((result, current, currentIndex) => {
      if (currentIndex > index) {
        result.push(sanitizeElement(current))
      }

      return result
    }, [])
  }

  if (isInBetweenGroupIndex) {
    group = elements.reduce((result, current, currentIndex) => {
      if (currentIndex > index && currentIndex < nextIndex) {
        result.push(sanitizeElement(current))
      }

      return result
    }, [])
  }

  return { ...sanitizeElement(elements[index]), children: group }
})

const sanitizeElement = (element) => ({
  type: element.type,
  ...(element.depth ? { depth: element.depth } : {}),
  value: element.children[0].value,
})

// =========================

// const finalResult = levelOneIndexes.map((index) => {
//   const isFirstGroupIndex = index === 0
//   const isLastGroupIndex = index === levelOneIndexes[levelOneIndexes.length - 1]

//   console.log({ isLastGroupIndex, index, checked: levelOneIndexes[levelOneIndexes.length - 1] })

//   let group
//   if (isFirstGroupIndex) {
//     const secondHeaderIndex = levelOneIndexes[1]
//     group = allElements.reduce((result, current, currentIndex) => {
//       if (currentIndex > 0 && currentIndex < secondHeaderIndex) {
//         result.push(sanitizeElement(current))
//       }

//       return result
//     }, [])
//   }

//   if (isLastGroupIndex) {
//     group = allElements.reduce((result, current, currentIndex) => {
//       if (currentIndex > index) {
//         result.push(sanitizeElement(current))
//       }

//       return result
//     }, [])
//   }

//   return { groupFor: sanitizeElement(allElements[index]), group }
// })

// console.log(finalResult)

// const reducedTree = tree.reduce((prev, current, currentIndex) => {

// }, {});

// console.log(reducedTree);

// if (isLastGroupIndex) {
//   console.log({ currentIndex, index })
//   if (currentIndex > index) {
//     result.push(sanitizeElement(current))
//   }
// }
