import { useRef, useState, useEffect } from 'react'

interface InitInputProps {
  id?: string
  label?: string
  value: string
  onChange: (value: string) => void
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
  const formatted = value.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
  const mirrorRef = useRef<HTMLSpanElement>(null)
  const [width, setWidth] = useState<number>(72)
  const [focused, setFocused] = useState(false)
  const [hovered, setHovered] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value.replace(/\s/g, '')

    // Если не цифры, то значение сбрасывается
    if (!/^\d+$/.test(inputValue)) {
      onChange('0')
      return
    }

    // Проверка на лишние нули
    onChange(inputValue.replace(/^0+/, '') || '0')
  }
  useEffect(() => {
    if (mirrorRef.current) {
      setWidth(Math.max(72, mirrorRef.current.offsetWidth + 2))
    }
  }, [formatted])

  const borderClass = focused
    ? 'border-[#906FEE]'
    : hovered
      ? 'border-[#AA9DCE]'
      : 'border-[#CFCADF]'

  return (
    <div>
      {label && (
        <label htmlFor={id} className="block mb-3 text-gray-700 font-[Koulen,sans-serif] text-base">
          {label}
        </label>
      )}
      <div className="flex items-center gap-3">
        <span
          ref={mirrorRef}
          className="absolute invisible whitespace-pre font-[Inter,sans-serif] text-lg px-3 min-w-[72px] min-h-[44px]"
          aria-hidden
        >
          {formatted || '0'}
        </span>
        <input
          id={id}
          type="text"
          value={formatted}
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
          onChange={handleInputChange}
          className={`border rounded outline-none font-[Inter,sans-serif] text-lg px-3 min-w-[72px] min-h-[44px] ${borderClass} ${focused ? 'text-gray-900' : 'text-[#CFCADF]'}`}
          style={{ width }}
          placeholder="0"
        />
        {suffix && <span className="text-gray-600 font-[Inter,sans-serif] text-lg">{suffix}</span>}
      </div>
    </div>
  )
}