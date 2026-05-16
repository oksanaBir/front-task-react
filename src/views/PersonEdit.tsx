import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/store'
import InitInput from '@/components/InitInput'

export default function PersonEdit() {
  const { id } = useParams<{ id: string }>()
  const person = useStore((state) => state.people.find((p) => p.id === Number(id)))
  const updatePersonAge = useStore((state) => state.updatePersonAge)
  const [inputFocused, setInputFocused] = useState(false)

  if (!person) {
    return (
      <div>
        <p className="text-gray-600">Person not found</p>
        <Link to="/" className="text-violet-600 hover:underline text-sm">
          Back to list
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-violet-600 hover:underline text-sm">
        &larr; Back
      </Link>

      <div className="flex items-center gap-3">
        <img
          src="/avatar.jpg"
          alt={person.name}
          className={`rounded-full object-cover flex-shrink-0 w-20 h-20 border-2 ${inputFocused ? 'border-[#3D06D7]' : 'border-transparent'}`}
        />
        <InitInput
          id="hours-input"
          label={`${person.name.toUpperCase()} IS`}
          value={person.ageInHours}  // теперь number
          onChange={(value) => updatePersonAge(person.id, value)}
          onFocusChange={setInputFocused}
          suffix="hours old"
        />
      </div>
    </div>
  )
}
