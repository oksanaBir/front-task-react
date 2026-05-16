import { useRef, useState, useEffect } from 'react'

interface InitInputProps {
  id: string
  label?: string
  value: number
  onChange: (value: number) => void
  onFocusChange?: (focused: boolean) => void
  suffix?: string
}

export default function InitInput({
  id,
  label,
  value,
  onChange,
  onFocusChange,
  suffix,
}: InitInputProps) {
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [width, setWidth] = useState(72)
  const mirrorRef = useRef<HTMLSpanElement>(null)

  // Преобразует число в строку с пробелами каждые 3 цифры (например: 1234567 → "1 234 567")
  // toLocaleString, чтобы корректно обрабатывать очень большие числа (e+21 и больше)
  const toStringWithSpaces = (num: number) => {
    if (isNaN(num) || !isFinite(num)) return '0'
    return num.toLocaleString('en-US', {
      maximumFractionDigits: 0,
      useGrouping: true,
    }).replace(/,/g, ' ')
  }

  // Преобразует строку с пробелами обратно в число
  // Если строка содержит не только цифры и пробелы, возвращает 0
  const toNumber = (str: string) => {
    const withoutSpaces = str.replace(/\s/g, '')
    const num = Number(withoutSpaces)
    return isNaN(num) || !isFinite(num) ? 0 : num
  }

  const displayValue = toStringWithSpaces(value)

  useEffect(() => {
    if (mirrorRef.current) {
      setWidth(Math.max(72, mirrorRef.current.offsetWidth + 2))
    }
  }, [displayValue])

  const borderClass = focused
    ? 'border-[#906FEE]'
    : hovered
      ? 'border-[#AA9DCE]'
      : 'border-[#CFCADF]'

  return (
    <div>
      {label && (
        <label aria-label={label || `Input for ${id}`} htmlFor={id} className="block mb-3 text-gray-700 font-[Koulen,sans-serif] text-base">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        <span
          ref={mirrorRef}
          className="absolute invisible whitespace-pre font-[Inter,sans-serif] text-lg px-3 min-w-[72px] min-h-[44px]"
          aria-hidden
        >
          {displayValue || '0'}
        </span>
        <input
          id={id}
          type="text"
          value={displayValue}
          onFocus={() => {
            setFocused(true)
            onFocusChange?.(true)
          }}
          onBlur={() => {
            setFocused(false)
            onFocusChange?.(false)
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onChange={(e) => {
            onChange(toNumber(e.target.value))
          }}
          className={`border rounded outline-none font-[Inter,sans-serif] text-lg px-3 min-w-[72px] min-h-[44px] ${borderClass} ${focused ? 'text-gray-900' : 'text-[#CFCADF]'}`}
          style={{ width }}
          placeholder="0"
        />
        {suffix && <span id={`${id}-suffix`} className="text-gray-600 font-[Inter,sans-serif] text-lg">{suffix}</span>}
      </div>
    </div>
  )
}