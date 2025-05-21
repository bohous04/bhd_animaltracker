import MainMenu from "./components/MainMenu"
import { debugAnimals, debugData } from "./lib/debugData"
import { isEnvBrowser } from "./lib/utils"
import { fetchNui } from "./lib/fetchNui"
import { useVisibility } from "./providers/VisibilityProvider"

debugData([
  {
    action: "setVisible",
    data: { visibility: true, allAnimals: debugAnimals },
  },
])

export default function App() {
  const {setVisible, allAnimals} = useVisibility()

  const handleCloseMenu = () => {
    if (isEnvBrowser()) return
    setVisible(false)
    fetchNui("hideFrame")
  }

  return (
    <MainMenu
      closeMenu={handleCloseMenu}
        allAnimals={allAnimals}
    />
  )
}