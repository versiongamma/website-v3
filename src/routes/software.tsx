import { createFileRoute } from '@tanstack/react-router'
import { NavBar } from 'src/components/NavBar'
import { SiteRoute } from '~utils/routes'

export const Route = createFileRoute('/software')({
  component: Software,
  head: () => ({
    meta: [
      {
        title: 'Software - Version Gamma',
      },
    ],
  }),
})

function Software() {
  return (
    <div className="flex w-screen h-screen flex-col">
      <NavBar path={SiteRoute.SOFTWARE} />
    </div>
  )
}
