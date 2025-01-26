import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { prisma } from "../lib/prisma";
import { MantineProvider } from "@mantine/core";
import { NavLinks } from "../components/Navbar";

async function getData({
  email,
  id,
  firstName,
  lastName,
  profileImage,
}: {
  email: string;
  id: string;
  firstName: string | undefined | null;
  lastName: string | undefined | null;
  profileImage: string | undefined | null;
}) {
  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });

  if (!user) {
    // const name = `${firstName ?? ""} ${lastName ?? ""}`;
    await prisma.user.create({
      data: {
        id: id,
        email: email,
        first_name: firstName,
        last_name: lastName,
        profile_image: profileImage,
      },
    });
  }
}

export default async function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (user) {
    await getData({
      email: user.email as string,
      firstName: user.given_name as string,
      id: user.id as string,
      lastName: user.family_name as string,
      profileImage: user.picture,
    });
  }

  return (
    <html lang="en">
      <body>
        <MantineProvider>
          {/* <NavLinks /> */}
          {/* <Navbar /> */}
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
