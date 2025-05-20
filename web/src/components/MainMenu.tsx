import BlurModal from './BlurModal'
import { AiOutlineClose } from 'react-icons/ai'
import AnimalCard from './AnimalCard'
import { useTranslation } from '@/providers/TranslationsContext'

export interface Animal {
  id: number
  name: string
  owner: string
  pedIdentifier: string
  image: string
}


interface Props {
  closeMenu: () => void
  allAnimals: Animal[]
}

export default function MainMenu({ closeMenu, allAnimals }: Props) {
  const { translate } = useTranslation()

  const handleClose = () => {
    closeMenu()
  }

  return (
    <>
      <BlurModal onClose={handleClose} />
      <div className="w-6/12 h-[70vh] bg-primary p-6 rounded-lg fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 gap-3">
        <div className="flex items-center justify-between mb-4">
          <div>
          <h2 className="text-2xl font-bold text-white">{translate("ui_title")}</h2>
          <p>{translate("ui_help")}</p>
          </div>
          <button onClick={handleClose} className="mb-4 text-white hover:text-red-400 focus:outline-none">
            <AiOutlineClose size={24} />
          </button>
        </div>
        <div className="flex gap-4 h-full" style={{ height: `calc(100% - 65px)` }}>
          <div className="flex-grow h-full overflow-y-auto pr-3">
            <div className="h-fit w-full grid gap-4 grid-cols-1 2xl:grid-cols-4 xl:grid-cols-3 lg:grid-cols-2">
              {allAnimals?.map((animal: Animal) => (
                <AnimalCard
                  animal={animal}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )  
}