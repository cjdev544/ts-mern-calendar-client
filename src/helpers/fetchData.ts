import { getEnvVariables } from './getEnvVariables'
import { StorageSave } from '../../types.d'

const fetchData = async <T>(url: string, method: string, body?: T) => {
  const { VITE_SERVER_URL } = getEnvVariables()
  const baseUrl = VITE_SERVER_URL

  const res = await fetch(`${baseUrl}${url}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-token': localStorage.getItem(StorageSave.TOKEN) || '',
    },
  })

  return await res.json()
}

export default fetchData
