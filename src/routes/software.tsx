import { createFileRoute } from '@tanstack/react-router'
import { NavBarDesktop } from 'src/components/NavBarDesktop'
import { SiteRoute } from '~utils/routes'

export const Route = createFileRoute('/software')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex w-screen h-screen flex-col">
      <NavBarDesktop path={SiteRoute.SOFTWARE} />
    </div>
  )
}
