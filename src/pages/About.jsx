import React from "react";
import { Headphones, ShieldCheck, Truck, WalletCards } from "lucide-react";

const stats = [
  { label: "Products", value: "150+" },
  { label: "Categories", value: "20+" },
  { label: "Support", value: "24/7" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "Trusted Quality",
    description:
      "We focus on practical, reliable products that are easy to compare and simple to buy.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Orders are handled quickly so customers can receive everyday essentials without delay.",
  },
  {
    icon: WalletCards,
    title: "Fair Pricing",
    description:
      "Clear prices, useful discounts, and no confusing checkout surprises.",
  },
  {
    icon: Headphones,
    title: "Helpful Support",
    description:
      "Customer questions are handled with clear answers before and after purchase.",
  },
];

const About = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <section className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            About MyShop
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 md:text-5xl">
            A simple online store for everyday shopping.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
            MyShop brings products, prices, and cart checkout into one clean
            shopping experience. The goal is to make browsing easy, product
            details clear, and buying fast on desktop and mobile.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-5">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white p-4 text-center">
                <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            Built for customers who want a direct path from discovery to cart,
            without a crowded shopping interface.
          </p>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((item) => {
          const Icon = item.icon;

          return (
            <article
              key={item.title}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <Icon className="h-8 w-8 text-blue-700" />
              <h2 className="mt-4 text-lg font-bold text-slate-950">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default About;
