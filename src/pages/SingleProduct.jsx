import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "../assets/Loading4.webm";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/useCart";
import { useData } from "../context/useData";

const SingleProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { data } = useData();
  const [singleProduct, setSingleProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getSingleProduct = async () => {
      setIsLoading(true);
      setError("");

      const existingProduct = data.find(
        (product) => String(product.id) === String(params.id),
      );

      if (existingProduct) {
        setSingleProduct(existingProduct);
        setIsLoading(false);
        return;
      }

      if (String(params.id).startsWith("fallback-")) {
        setSingleProduct(null);
        setError("Product details are unavailable.");
        setIsLoading(false);
        return;
      }

      try {
        const res = await axios.get(`/api/products/${params.id}`);
        const product = res.data.product || res.data;
        setSingleProduct(product);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Unable to load product details.");
        setSingleProduct(null);
      } finally {
        setIsLoading(false);
      }
    };

    getSingleProduct();
  }, [data, params.id]);

  const originalPrice = Math.round(
    singleProduct?.price +
      (singleProduct?.price * (singleProduct?.discount || 0)) / 100,
  );

  const handleAddToCart = () => {
    addToCart(singleProduct, quantity);
    navigate("/cart");
  };

  return (
    <>
      {singleProduct ? (
        <div className="px-4 pb-4 md:px-0">
          <div className="mx-auto max-w-6xl py-4 text-sm text-slate-500">
            <Link to="/" className="hover:text-blue-700">
              Home
            </Link>
            <span className="px-2">/</span>
            <Link to="/products" className="hover:text-blue-700">
              Products
            </Link>
            <span className="px-2">/</span>
            <span className="text-slate-900">{singleProduct.title}</span>
          </div>
          <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* product image */}
            <div className="w-full">
              <img
                src={singleProduct.image}
                alt={singleProduct.title}
                className="rounded-2xl w-full object-cover"
              />
            </div>
            {/* product details */}
            <div className="flex flex-col gap-6">
              <h1 className="md:text-3xl text-xl font-bold text-gray-800">
                {singleProduct.title}
              </h1>
              <div className="text-gray-700">
                {singleProduct.brand?.toUpperCase()} /
                {singleProduct.category?.toUpperCase()} /{singleProduct.model}
              </div>
              <p className="text-xl text-blue-500 font-bold">
                ${singleProduct.price}{" "}
                {singleProduct.discount ? (
                  <>
                    <span className="line-through text-gray-700">
                      ${originalPrice}
                    </span>{" "}
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full">
                      {singleProduct.discount}% discount
                    </span>
                  </>
                ) : null}
              </p>
              <p className="text-gray-600">{singleProduct.description}</p>

              {/* qunatity selector */}
              <div className="flex items-center gap-4">
                <label htmlFor="" className="text-sm font-medium text-gray-700">
                  Quantity:
                </label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(event) => setQuantity(event.target.value)}
                  className="w-20 border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-700"
                />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="px-6 flex gap-2 py-2 text-lg bg-blue-700 text-white rounded-md hover:bg-blue-600"
                >
                  <IoCartOutline className="w-6 h-6" /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      ) : (
        <div className="flex min-h-[400px] items-center justify-center px-4 text-center">
          <div>
            <p className="text-2xl font-bold text-slate-900">
              Product not found
            </p>
            <p className="mt-2 text-sm text-slate-500">{error}</p>
            <Link
              to="/products"
              className="mt-6 inline-flex rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-600"
            >
              Back to products
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
