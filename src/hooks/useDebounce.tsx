import { useEffect, useState } from 'react'

const useDebounce = (value: string) => {
  const [debouncedValue, setDebouncedvalue] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedvalue(value)
    }, 500)

    return () => {
      clearTimeout(id)
    }
  }, [value, 500])

  return debouncedValue
}
export default useDebounce
