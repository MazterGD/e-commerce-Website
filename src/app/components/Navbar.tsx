import { Group, Button } from '@mantine/core';
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <Group justify="flex-end" gap="xs">
      <Button className={styles.navbarButton} variant="subtle" component="a" href="/">Home</Button>
      <Button className={styles.navbarButton} variant="subtle" component="a" href="/product">Product</Button>
      <Button className={styles.navbarButton} variant="subtle" component="a" href="/settings">Settings</Button>
      <Button className={`${styles.navbarButton} ${styles.loginButton}`} component="a" href="/login">Login</Button>
    </Group>
  );
}
