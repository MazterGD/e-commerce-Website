import { Group, Button } from '@mantine/core';

export default function Navbar() {
  return (
    <Group justify="flex-end" gap="xs">
      <Button variant="default" component="a" href="/">Home</Button>
      <Button variant="default" component="a" href="/product">Product</Button>
      <Button variant="default" component="a" href="/settings">Settings</Button>
    </Group>
  );
}
