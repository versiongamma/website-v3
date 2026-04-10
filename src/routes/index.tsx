import { createFileRoute } from '@tanstack/react-router'
import Landing from 'src/components/landing'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return <Landing />
}
