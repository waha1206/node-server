function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

function appendZero(obj) {
  if (obj < 10) return '0' + '' + obj
  else return obj
}

function appendTwoZero(obj) {
  if (obj < 10) return '00' + '' + obj
  else if (obj < 100) return '0' + '' + obj
  else return obj
}

export { isEmpty, appendZero, appendTwoZero }
