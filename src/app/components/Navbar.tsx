"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Group, Button } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import styles from "../styles/Navbar.module.css";

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav>
      <Group justify="flex-end" gap="xl">
        <Link className={`link ${pathname === "/" ? "active" : ""}`} href="/">
          Home
        </Link>
        <Link
          className={`link ${pathname === "/product" ? "active" : ""}`}
          href="/product"
        >
          Product
        </Link>
        <Link
          className={`link ${pathname === "/settings" ? "active" : ""}`}
          href="/settings"
        >
          Settings
        </Link>
        <Button
          className={styles.navbarButton}
          variant="subtle"
          component="a"
          href="/cart"
          leftSection={<IconShoppingCart size={18} />}
        ></Button>
        <Button
          className={`${styles.navbarButton} ${styles.loginButton}`}
          component="a"
          href="/login"
        >
          Login
        </Button>
      </Group>
    </nav>
  );
}