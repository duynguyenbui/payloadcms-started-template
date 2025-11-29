import { GemIcon } from 'lucide-react'

export default function Page() {
  return (
    <div className="flex min-h-screen text-2xl font-bold items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      Hello, Payload + Next.js + PostgreSQL!
      <GemIcon className="ml-4 inline-block h-8 w-8 text-blue-500" />
    </div>
  )
}
