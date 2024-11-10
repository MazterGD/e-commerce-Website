import { SimpleGrid } from "@mantine/core";
import FeaturesCard from "./FeaturesCard";

export default function Gallery() {
  return (
    <section>
      <h1>Products</h1>
      <SimpleGrid cols={5} spacing="xl">
        <FeaturesCard
          product={{
            name: "Tesla Model S",
            description: "Free recharge at any station",
            discount: 25,
            price: 168.00
          }}
        />
        <FeaturesCard product={{
            name: "Axiata",
            description: "Lorem Ipsem",
            discount: 50,
            price: 10500.00
          }}/>
        <FeaturesCard product={{
            name: "Nishith",
            description: "Pinnawala ali anathagaraya",
            discount: 100,
            price: 10.50
          }}/>
        <FeaturesCard product={{
            name: "Suchi",
            description: "Rainbow loving marketing wizard with a sweet cute voice",
            discount: 5,
            price: 5000
          }}/>
        <FeaturesCard product={{
            name: "Bhagya Ranasinghe",
            description: "Free recharge at any station",
            discount: 7.5,
            price: 500.00
          }}/>
        <FeaturesCard
          product={{
            name: "Tesla Model S",
            description: "Free recharge at any station",
            discount: 25,
            price: 168.00
          }}
        />
        <FeaturesCard
          product={{
            name: "Tesla Model S",
            description: "Free recharge at any station",
            discount: 25,
            price: 168.00
          }}
        />
      </SimpleGrid>
    </section>
  );
}
