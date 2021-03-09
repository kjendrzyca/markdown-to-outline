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
  // console.log(JSON.stringify(allElements, null, 2))

  const finalResult = mapStuff(levelOneIndexes, allElements)

  // console.log(JSON.stringify(finalResult, null, 2))

  return finalResult
}

const mapStuff = (headingIndexes, elements) => {
  const firstHeaderIndex = headingIndexes[0]
  // in case there is no first header and md starts with paragraphs
  const elementsBeforeFirstIndex = elements.reduce((result, current, currentIndex) => {
    if (currentIndex < firstHeaderIndex) {
      result.push(sanitizeElement(current))
    }

    return result
  }, [])

  const elementsAfterFirstIndex = headingIndexes.map((index, indexIterator) => {
    const isFirstGroupIndex = index === headingIndexes[0]
    const isLastGroupIndex = index === headingIndexes[headingIndexes.length - 1]
    // TODO: hardcoded 0 shouldn't be here
    const isInBetweenGroupIndex = (
      index > headingIndexes[0] && index < headingIndexes[headingIndexes.length - 1]
    )
    const nextIndex = headingIndexes[indexIterator + 1]

    console.log({ isInBetweenGroupIndex, index })

    let group
    if (isFirstGroupIndex) {
      const secondHeaderIndex = headingIndexes[1]
      group = elements.reduce((result, current, currentIndex) => {
        if (currentIndex > firstHeaderIndex && currentIndex < secondHeaderIndex) {
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

    console.log({ group })
    // const allLevel2Indexes = findAllIndexes(group, 2)
    // console.log(allLevel2Indexes)
    // const mappedLevel2 = mapStuff(allLevel2Indexes, group)
    // console.log('mapped level 2', mappedLevel2, group)

    return { ...sanitizeElement(elements[index]), children: group }
  })

  return [...elementsBeforeFirstIndex, ...elementsAfterFirstIndex]
}

const findAllIndexes = (array, level) => array.reduce((prev, current, currentIndex) => {
  if (indexPredicate(current, level)) {
    prev.push(currentIndex)
  }
  return prev
}, [])

const indexPredicate = (element, level) => element.type === 'heading' && element.depth === level

const sanitizeElement = (element) => ({
  type: element.type,
  ...(element.depth ? { depth: element.depth } : {}),
  value: element.children ? element.children[0].value : element.value,
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
