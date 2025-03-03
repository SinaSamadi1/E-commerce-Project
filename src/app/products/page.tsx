'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { useCartStore } from "@/store/cartStore";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, removeFromCart, updateProductQuantity, cart } = useCartStore();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching products");
        }
        return res.json();
      })
      .then((data) => {
        const updatedProducts = data.map((product: Product) => ({
          ...product,
          quantity: 1,
        }));
        setProducts(updatedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("مشکلی در دریافت محصولات پیش آمده است.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleRemoveFromCart = (product: Product) => {
    removeFromCart(product.id);
  };

  const handleIncreaseQuantity = (product: Product) => {
    updateProductQuantity(product.id, product.quantity + 1);
  };

  const handleDecreaseQuantity = (product: Product) => {
    if (product.quantity > 1) {
      updateProductQuantity(product.id, product.quantity - 1);
    }
  };

  return (
    <div className="bg-white p-4">
      <h1 className="text-2xl font-bold mb-8">لیست</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="rounded-lg shadow-lg p-4">
            <h2 className="text-xl font-semibold pb-2">{product.name}</h2>
            <p className="text-gray-600 pb-2">{product.description}</p>
            <p className="text-green-600 font-bold">
              قیمت: {product.price.toLocaleString()} تومان
            </p>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                width={250}
                height={0}
                className="rounded-lg mt-2 h-52"
              />
            ) : (
              <p className="text-red-500">تصویر موجود نیست</p>
            )}
            
            <button 
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-indigo-600 cursor-pointer"
              onClick={() => handleAddToCart(product)}
            >
              افزودن به سبد خرید
            </button>
            <Link href={`/products/${product.id}`} className="text-blue-500 mt-2 block">
              مشاهده جزئیات
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;