interface HeaderContent {
  Accept: string
  'Content-Type': string
  Authorization?: string
}

const headerContentWithAuthorization: HeaderContent = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
}

export const customHeaders = (token: string) => {
  const copiedHeaderContentWithAuthorization: HeaderContent = {
    ...headerContentWithAuthorization
  }
  copiedHeaderContentWithAuthorization['Authorization'] = `Bearer ${token}`
  return { headers: copiedHeaderContentWithAuthorization }
} 