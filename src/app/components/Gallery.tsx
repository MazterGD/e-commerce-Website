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
            name: "Batmobile",
            description: "Lorem Ipsem",
            discount: 50,
            price: 10500.00
          }}/>
        <FeaturesCard product={{
            name: "Product 03",
            description: "Description 03",
            discount: 100,
            price: 10.50
          }}/>
        <FeaturesCard product={{
            name: "Product 04",
            description: "Description 04 - lorem ipsum blah blah blah blah long text paragraph to check apperance",
            discount: 5,
            price: 5000
          }}/>
        <FeaturesCard product={{
            name: "Product 05",
            description: "Description 05",
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
