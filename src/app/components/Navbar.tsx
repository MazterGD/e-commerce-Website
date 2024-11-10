import { Group, Button } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import styles from "../styles/Navbar.module.css";

export default function Navbar() {
  return (
    <Group justify="flex-end" gap="xs">
      <Button className={styles.navbarButton} variant="subtle" component="a" href="/">Home</Button>
      <Button className={styles.navbarButton} variant="subtle" component="a" href="/product">Product</Button>
      <Button className={styles.navbarButton} variant="subtle" component="a" href="/settings">Settings</Button>
      <Button className={styles.navbarButton} variant="subtle" component="a" href="/settings" leftSection={<IconShoppingCart size={18} />}></Button>
      <Button className={`${styles.navbarButton} ${styles.loginButton}`} component="a" href="/login">Login</Button>
    </Group>
  );
}

// "use client";

// import { Autocomplete, Group, Burger, rem } from '@mantine/core';
// import { useDisclosure } from '@mantine/hooks';
// import { IconSearch } from '@tabler/icons-react';
// import { MantineLogo } from '@mantinex/mantine-logo';
// import classes from '../styles/Navbar.module.css';

// const links = [
//   { link: '/', label: 'Home' },
//   { link: '/Products', label: 'Products' },
//   { link: '/Settings', label: 'Settings' },
//   { link: '/Login', label: 'Login' },
// ];

// export default function Navbar() {
//   const [opened, { toggle }] = useDisclosure(false);

//   const items = links.map((link) => (
//     <a
//       key={link.label}
//       href={link.link}
//       className={classes.link}
//       onClick={(event) => event.preventDefault()}
//     >
//       {link.label}
//     </a>
//   ));

//   return (
//     <header className={classes.header}>
//       <div className={classes.inner}>
//         <Group>
//           <Burger opened={opened} onClick={toggle} size="sm" hiddenFrom="sm" />
//           <MantineLogo size={28} />
//         </Group>

//         <Group>
//           <Group ml={50} gap={5} className={classes.links} visibleFrom="sm">
//             {items}
//           </Group>
//           <Autocomplete
//             className={classes.search}
//             placeholder="Search"
//             leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
//             data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
//             visibleFrom="xs"
//           />
//         </Group>
//       </div>
//     </header>
//   );
// }
