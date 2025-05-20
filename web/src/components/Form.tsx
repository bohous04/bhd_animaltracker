import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useEffect } from "react"

interface Field {
  label: string
  type: string
  id: string
  placeholder?: string
  min?: string
  max?: string
}

interface CardWithFormProps {
  fields: Field[]
  onSubmit: (formData: any) => void
  title?: string
  description?: string
  cancelButtonText?: string
  submitButtonText?: string
  onCancel?: () => void
}

export default function Form({ fields, onSubmit, title = "Create project", description = "Deploy your new project in one-click.", cancelButtonText = "Cancel", submitButtonText = "Submit", onCancel }: CardWithFormProps) {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    onSubmit(data)
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  }

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        handleCancel()
      }
    }
    window.addEventListener("keydown", keyHandler)
    return () => window.removeEventListener("keydown", keyHandler)
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-[350px] bg-secondary text-white p-6 rounded-lg shadow-lg z-50">
        <CardHeader>
          <CardTitle className="text-white">{title}</CardTitle>
          <CardDescription className="text-white">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              {fields.map((field) => (
                <div key={field.id} className="flex flex-col space-y-1.5">
                  <Label htmlFor={field.id} className="text-white">{field.label}</Label>
                  <Input id={field.id} name={field.id} type={field.type} placeholder={field.placeholder} min={field.min} max={field.max} className="bg-primary text-white" />
                </div>
              ))}
            </div>
            <CardFooter className="flex justify-between mt-4">
              <Button variant="outline" type="button" className="bg-primary text-white" onClick={handleCancel}>{cancelButtonText}</Button>
              <Button type="submit" className="bg-primary text-white hover:bg-blue-500">{submitButtonText}</Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}