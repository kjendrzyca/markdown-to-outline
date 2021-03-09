module.exports = (jsonTree) => reduceChildren(jsonTree).join('\n')

const reduceChildren = (children, itemPrefix = '') => {
  const reducedTree = children.reduce((result, current) => {
    const formatted = formatListItem(current, itemPrefix)
    result.push(formatted)

    if (current.children) {
      result.push(...reduceChildren(current.children, `${itemPrefix}  `))
    }

    return result
  }, [])

  return reducedTree
}

const formatListItem = (element, itemPrefix) => `${itemPrefix}- ${parseMultilineElement(element, itemPrefix)}`

const parseMultilineElement = (element, itemPrefix) => element.value.split('\n').join(`\n${itemPrefix}  `)
