import fetchData from '../../src/helpers/fetchData'
import { getEnvVariables } from '../../src/helpers/getEnvVariables'
import { StorageSave } from '../../types.d'

describe('Test in fetchData', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: 'mock response' }),
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should call fetch with the correct arguments', async () => {
    const url = '/data'
    const method = 'GET'
    const body = { test: 'value' }
    const token = 'mock token'
    const { VITE_SERVER_URL } = getEnvVariables()
    const baseUrl = VITE_SERVER_URL

    localStorage.setItem(StorageSave.TOKEN, token)

    const response = await fetchData(url, method, body)

    expect(fetch).toHaveBeenCalledWith(
      baseUrl + url,
      expect.objectContaining({
        method: 'GET',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'x-token': token,
        },
      })
    )
    expect(response).toEqual({ data: 'mock response' })
  })
})
