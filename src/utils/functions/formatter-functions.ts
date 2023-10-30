export const dateFormatter = (date: string): string => {
  if (date) {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
  }
  return ''
}

export const phoneFormatter = (value: string): string => {
  const cellphoneLengthWithDDDFormatted = 14

  const numericValue = value.replace(/[^0-9]/g, '')

  let formattedValue = numericValue.replace(/(\d{2})(\d)/, '($1) $2')

  formattedValue = formattedValue.replace(/(\d{4})(\d)/, '$1-$2')

  if (formattedValue.length === cellphoneLengthWithDDDFormatted) {
    formattedValue = formattedValue.replace(/(\d{5})(\d)/, '$1-$2')
  }

  return formattedValue
}
