import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";

const contactDetails = [
  {
    icon: Phone,
    title: "Phone",
    detail: "+94 77 123 4567",
  },
  {
    icon: Mail,
    title: "Email",
    detail: "support@myshop.com",
  },
  {
    icon: MapPin,
    title: "Location",
    detail: "Colombo, Sri Lanka",
  },
];

const Contact = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8 md:py-12">
      <section className="grid gap-8 md:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            Contact Us
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-950 md:text-5xl">
            Need help with your order?
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600 md:text-lg">
            Send us a message for product questions, delivery help, or cart and
            checkout support. We will get back to you as soon as possible.
          </p>

          <div className="mt-8 grid gap-4">
            {contactDetails.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="rounded-lg bg-blue-50 p-3 text-blue-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-950">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <form className="rounded-xl border border-slate-200 bg-slate-50 p-5 md:p-7">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="rounded-lg border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-lg border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Subject
            </label>
            <input
              type="text"
              placeholder="How can we help?"
              className="rounded-lg border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <div className="mt-4 flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Message
            </label>
            <textarea
              rows={6}
              placeholder="Write your message"
              className="resize-none rounded-lg border border-slate-200 px-4 py-3 outline-none focus:ring-2 focus:ring-blue-700"
            />
          </div>

          <button
            type="button"
            className="mt-5 w-full rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white hover:bg-blue-600 sm:w-auto"
          >
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;
