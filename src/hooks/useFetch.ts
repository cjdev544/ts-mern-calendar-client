import { useEffect, useState } from 'react'

interface FetchResult<T> {
  data: T | null
  loading: boolean
  error: unknown | null
}

export default function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const aborter = new AbortController()
    setLoading(true)
    fetch(url, { signal: aborter.signal })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false))

    return () => aborter.abort()
  }, [url])

  return { data, loading, error }
}
