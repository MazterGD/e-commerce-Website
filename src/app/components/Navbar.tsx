import "@mantine/core/styles.css";
import { Tabs } from "@mantine/core";

export default function Navbar() {
  return (
    <div>
      <Tabs defaultValue="first">
        <Tabs.List>
          <Tabs.Tab value="first">First tab</Tabs.Tab>
          <Tabs.Tab value="second">Second tab</Tabs.Tab>
          <Tabs.Tab value="third">Third tab</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </div>
  );
}
