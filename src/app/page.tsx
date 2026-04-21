import Navigation from '@/components/ui/Navigation'
import Scene01Arrival from '@/components/scenes/Scene01Arrival'
import Scene02Manifesto from '@/components/scenes/Scene02Manifesto'
import Scene03Services from '@/components/scenes/Scene03Services'
import Scene04Process from '@/components/scenes/Scene04Process'
import Scene05Story from '@/components/scenes/Scene05Story'
import Scene06Proof from '@/components/scenes/Scene06Proof'
import Scene07Invitation from '@/components/scenes/Scene07Invitation'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="relative w-full bg-off-black">
        <Scene01Arrival />
        <Scene02Manifesto />
        <Scene03Services />
        <Scene04Process />
        <Scene05Story />
        <Scene06Proof />
        <Scene07Invitation />
      </main>
    </>
  )
}
