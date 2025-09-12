import { useState } from "react"

export function useMultiSelect(initial: string[] = []) {
  const [values, setValues] = useState<string[]>(initial)

  const toggleValue = (value: string) => {
    setValues(prev =>
      prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
    )
  }

  return { values, toggleValue, setValues }
}
