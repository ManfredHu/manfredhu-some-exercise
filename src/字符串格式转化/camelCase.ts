function capitalize(str: string) { // 首字母大写，其他为小写
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

function camelCase(str: string) { // 小驼峰格式
  return str.split('_').map((j, idx) => {
    j = j.toLowerCase()
    return idx === 0 ? j: capitalize(j)
  }).join('')
}

console.log(camelCase('TEST_VARIABLE'))