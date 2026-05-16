import { Link } from 'react-router-dom'
import { useStore } from '@/store'
import InitInput from '@/components/InitInput'

export default function Settings() {
  const minimumAgeInMonths = useStore((state) => state.minimumAgeInMonths)
  const setMinimumAgeInMonths = useStore((state) => state.setMinimumAgeInMonths)

  return (
    <div className="flex flex-col gap-4">
      <Link to="/" className="text-violet-600 hover:underline text-sm">
        &larr; Back
      </Link>

      <h1 className="text-xl font-bold text-gray-700">Settings</h1>

      <InitInput
        id="min-age-input"
        label="MINIMUM AGE"
        value={minimumAgeInMonths}
        onChange={setMinimumAgeInMonths}
        suffix="months"
      />
    </div>
  )
}
