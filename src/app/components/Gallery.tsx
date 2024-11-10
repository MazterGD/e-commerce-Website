import { ReactNode } from "react";
import { SimpleGrid } from "@mantine/core";
import FeaturesCard from "./FeaturesCard";

interface CardProps {
  children: ReactNode;
}

function Card({ children }: CardProps) {
  return <div className="card">{children}</div>;
}

export function Profile() {
  return (
    <Card>
      <img
        src="https://i.imgur.com/QIrZWGIs.jpg"
        alt="Alan L. Hart"
        className="avatar"
      />
      <br />
      <b>Product Name</b>
      <p>Category</p>
      <p>Price</p>
    </Card>
  );
}

export default function Gallery() {
  return (
    <section>
      <h1>Products</h1>
      <SimpleGrid cols={5} spacing="xs">
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <FeaturesCard />
        <Profile />
        <Profile />
      </SimpleGrid>
    </section>
  );
}
