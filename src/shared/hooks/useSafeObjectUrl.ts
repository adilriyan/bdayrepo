import { useEffect, useRef } from 'react'

/**
 * Safely manages object URLs created with URL.createObjectURL and revokes them
 * when updated or when the component unmounts to prevent memory leaks.
 */
export function useSafeObjectUrls() {
  const urlsRef = useRef<Set<string>>(new Set())

  const createSafeUrl = (file: File | Blob): string => {
    const url = URL.createObjectURL(file)
    urlsRef.current.add(url)
    return url
  }

  const revokeUrl = (url: string) => {
    if (urlsRef.current.has(url)) {
      URL.revokeObjectURL(url)
      urlsRef.current.delete(url)
    }
  }

  const clearAllUrls = () => {
    urlsRef.current.forEach(url => URL.revokeObjectURL(url))
    urlsRef.current.clear()
  }

  useEffect(() => {
    return () => {
      clearAllUrls()
    }
  }, [])

  return { createSafeUrl, revokeUrl, clearAllUrls }
}

