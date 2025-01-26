import { Button } from "@mantine/core" 
import { Input } from "@mantine/core"
import { InputLabel } from "@mantine/core" 
import { prisma } from "../lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getData(userId:string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      first_name: true,
      last_name: true,
      email: true,
      profile_image: true
    }
  })
}

export default async function SimpleForm() {
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();
  // const data = await getData(user.id as string);
  
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
        <Input id="firstName" name="firstName" required placeholder="G"/>
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="lastName">Last Name</InputLabel>
        <Input id="lastName" name="lastName" required placeholder="h"/>
      </div>
      <div className="space-y-2">
        <InputLabel htmlFor="email">Email</InputLabel>
        <Input id="email" name="email" type="email" required placeholder="d"/>
      </div>
      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  )
}