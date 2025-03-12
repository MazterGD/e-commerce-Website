// "use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Group, Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import styles from "../styles/Navbar.module.css";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function NavLinks() {
  // const pathname = usePathname();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  console.log(user);

  return (
    <nav>
      <Group justify="flex-end" gap="xl">
        <Link
          // className={`link ${pathname === "/" ? "active" : ""}`}
          href="/"
        >
          Home
        </Link>
        <Link
          // className={`link ${pathname === "/product" ? "active" : ""}`}
          href="/product"
        >
          Product
        </Link>
        <Link
          // className={`link ${pathname === "/settings" ? "active" : ""}`}
          href="/settings"
        >
          Settings
        </Link>
        <Link href="/store">Store</Link>
        <Button
          className={styles.navbarButton}
          variant="subtle"
          component="a"
          href="/cart"
          leftSection={<IconShoppingCart size={18} />}
        ></Button>
        {/* <Button
          className={`${styles.navbarButton} ${styles.loginButton}`}
          component="a"
          href="/login"
        >
          Login
        </Button> */}
        {user ? (
          <LogoutLink>
            <Button className={`${styles.navbarButton} ${styles.loginButton}`}>
              Logout
            </Button>
          </LogoutLink>
        ) : (
          <div>
            <LoginLink>
              <Button
                className={`${styles.navbarButton} ${styles.loginButton}`}
              >
                Sign In
              </Button>
            </LoginLink>
            <RegisterLink>
              <Button
                className={`${styles.navbarButton} ${styles.signinButton}`}
              >
                Sign up
              </Button>
            </RegisterLink>
          </div>
        )}

        {/* <LoginLink>Sign in</LoginLink>
        <RegisterLink>Sign up</RegisterLink>
        <LogoutLink>LogOut</LogoutLink> */}
      </Group>
    </nav>
  );
}
