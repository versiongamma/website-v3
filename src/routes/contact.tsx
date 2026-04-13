import { Input } from '@heroui/input'
import { createFileRoute } from '@tanstack/react-router'
import { NavBar } from 'src/components/NavBar'
import { SiteRoute } from '~utils/routes'

export const Route = createFileRoute('/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex w-screen h-screen flex-col">
      <NavBar path={SiteRoute.CONTACT} />
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col max-w-160 flex-1 gap-4">
          <Input label="Email" />
          <Input label="Subject" />
        </div>
      </div>
    </div>
  )
}
