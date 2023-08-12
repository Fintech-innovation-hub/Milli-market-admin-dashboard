export const formatDate = convertData =>
  `${new Intl.DateTimeFormat('en-UK', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }).format(new Date(convertData))}`