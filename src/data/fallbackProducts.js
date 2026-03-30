import bannerImage from "../assets/banner1.jpg";
import heroImage from "../assets/hero.png";

const fallbackProducts = [
  {
    id: "fallback-1",
    title: "Atlas Wireless Speaker",
    price: 129.99,
    description:
      "A compact wireless speaker with room-filling sound and a battery built for all-day listening.",
    category: "electronics",
    image: heroImage,
  },
  {
    id: "fallback-2",
    title: "Oakline Desk Lamp",
    price: 49.99,
    description:
      "An adjustable desk lamp with warm light and a matte finish that fits home and office setups.",
    category: "home",
    image: bannerImage,
  },
  {
    id: "fallback-3",
    title: "Transit Everyday Backpack",
    price: 79.99,
    description:
      "A lightweight backpack with a padded laptop sleeve, water-resistant shell, and clean everyday layout.",
    category: "accessories",
    image: heroImage,
  },
  {
    id: "fallback-4",
    title: "Motion Knit Sneakers",
    price: 94.99,
    description:
      "Breathable knit sneakers with flexible cushioning for commuting, travel, and casual daily wear.",
    category: "fashion",
    image: bannerImage,
  },
  {
    id: "fallback-5",
    title: "Core Resistance Kit",
    price: 39.99,
    description:
      "A home fitness kit with multiple resistance levels and compact storage for small spaces.",
    category: "fitness",
    image: heroImage,
  },
];

export default fallbackProducts;
