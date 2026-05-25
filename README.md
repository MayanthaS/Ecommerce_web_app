# MyShop - React Ecommerce Web App

MyShop is a responsive ecommerce web application built with React, Vite, Tailwind CSS, and React Router. It includes product browsing, filtering, product detail pages, cart management, toast notifications, and mobile-friendly layouts.

## Features

- Responsive homepage carousel
- Product listing with search, category, brand, price filtering, and pagination
- Single product details page
- Add to cart from product cards and product detail page
- Cart quantity increase, decrease, and remove actions
- Cart total and checkout summary
- Toast notifications for cart actions
- Responsive navbar, cart page, about page, and contact page
- Location detection UI
- Optional Clerk authentication support
- Fallback product data when the live catalog is unavailable

## Tech Stack

- React
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Slick
- React Toastify
- Lucide React
- React Icons
- Clerk React

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:5173
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  Components/
    Carousel.jsx
    Category.jsx
    FilterSection.jsx
    Footer.jsx
    MobileFilter.jsx
    Navbar.jsx
    Pagination.jsx
    ProductCard.jsx
  context/
    CartContext.jsx
    CartState.js
    DataContext.jsx
    DataProvider.jsx
    useCart.js
    useData.js
  data/
    fallbackProducts.js
  pages/
    About.jsx
    Cart.jsx
    Contact.jsx
    Home.jsx
    Product.jsx
    SingleProduct.jsx
  App.jsx
  main.jsx
```

## Main Pages

- `/` - Home page
- `/products` - Product listing page
- `/products/:id` - Single product page
- `/cart` - Cart page
- `/about` - About page
- `/contact` - Contact page

## Cart Behavior

The cart uses React Context for shared state. Products can be added from the product grid or the single product page. If an item already exists in the cart, its quantity is increased. Cart actions show toast notifications using React Toastify.

## API

The app uses a Vite proxy for product requests:

```js
/api/products
```

The proxy is configured in `vite.config.js` and points to Fake Store API. If the live catalog fails, fallback product data is used.

## Author

Built by a React developer as a responsive ecommerce project.
