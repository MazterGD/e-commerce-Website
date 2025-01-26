import { Button } from "@mantine/core" 
import { Input } from "@mantine/core"
import { InputLabel } from "@mantine/core" 

export default function SimpleForm() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    const email = formData.get("email")

    console.log("Form submitted:", { firstName, lastName, email })
    // Here you would typically send this data to an API or perform some other action
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2">
        <InputLabel htmlFor="firstName">First Name</InputLabel>
        <Input id="firstName" name="firstName" required />
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input id="lastName" name="lastName" required />
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" name="email" type="email" required />
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}

