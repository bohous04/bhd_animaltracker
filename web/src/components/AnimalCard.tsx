import { Animal } from "./MainMenu"
import { useTranslation } from "@/providers/TranslationsContext"
import { Button } from "@/components/ui/button"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"
import { fetchNui } from "@/lib/fetchNui"
import { useState } from "react"
import Form from "./Form"
import { useVisibility } from "@/providers/VisibilityProvider"

interface Props {
  animal: Animal
}

export default function AnimalCard({ animal, }: Props) {
  const { translate } = useTranslation()
  const [showForm, setShowForm] = useState("")
  const { allAnimals, setAllAnimals } = useVisibility()

  const handleFind = () => {
    fetchNui("findAnimal", { animal: animal })
  }

  const handleSubmit = (formData: any) => {
    setShowForm("")
    const updatedAnimals = allAnimals.map(a => {
      if (a.id === animal.id) {
        return {
          ...a,
          name: formData.name ?? a.name,
          image: formData.image ?? a.image
        }
      }
      return a
    })
    setAllAnimals(updatedAnimals)
    const name = formData.name 
    const image = formData.image
    if (name) {
      fetchNui("renameAnimal", {  newName: name, animal: animal })
    }
    if (image) {
      fetchNui("changeAnimalImage", { newImage: image, animal: animal })
    }
  }

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className={`p-3 rounded-lg shadow-lg bg-neutral-900/90`} >
          <div className="relative w-full overflow-hidden rounded-md mb-2 pb-0">
            <img
              src={
                animal.image && animal.image !== ""
                  ? animal.image
                  : animal.name.toLowerCase().includes("cat")
                  ? "assets/cat_not_found.png"
                  : "assets/dog_not_found.png"
              }
              alt={animal.name}
              className="w-full h-full object-contain rounded-md no-drag transition-opacity duration-300 opacity-100"
            />
          </div>
          <div className="flex flex-col items-center gap-2">
              <h3 className="px-2 font-bold break-words whitespace-normal max-w-[80%]">{animal.name}</h3>
              <Button onClick={handleFind}>{translate("ui_find")}</Button>
          </div>
        </div>
      </ContextMenuTrigger>
      {showForm && showForm !== "" && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
          {showForm === "rename" && (
            <Form
              fields={[{ label: translate("ui_form_rename_text"), type: "text", id: "name", placeholder: "" }]}
              onSubmit={handleSubmit}
              title={translate("ui_form_rename_title")}
              description={translate("ui_form_rename_desc")}
              cancelButtonText={translate("ui_form_button_cancel")}
              submitButtonText={translate("ui_form_button_confirm")}
              onCancel={() => setShowForm("")}
            />
          )}
          {showForm === "changeImage" && (
            <Form
              fields={[{ label: translate("ui_form_change_image"), type: "text", id: "image", placeholder: "" }]}
              onSubmit={handleSubmit}
              title={translate("ui_form_change_image_title")}
              description={translate("ui_form_change_image_desc")}
              cancelButtonText={translate("ui_form_button_cancel")}
              submitButtonText={translate("ui_form_button_confirm")}
              onCancel={() => setShowForm("")}
            />
          )}
        </div>
      )}
      <ContextMenuContent>
        <ContextMenuItem onClick={() => {setShowForm("rename")}}>{translate("ui_rename")}</ContextMenuItem>
        <ContextMenuItem onClick={() => {setShowForm("changeImage")}}>{translate("ui_change_image")}</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  )
}