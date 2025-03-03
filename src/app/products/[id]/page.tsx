'use client';

import { useEffect, useState } from "react";
import Image from 'next/image';
import { useCartStore } from "@/store/cartStore";
import { use } from "react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
}


const ProductDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/api/products/${id}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error fetching product");
          }
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setError("مشکلی در دریافت محصول پیش آمده است.");
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>محصولی یافت نشد.</div>;
  }

  return (
    <div className="bg-white pt-16 pr-4">
      <div className="flex">
        <div>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="rounded-lg mt-2"
            />
          ) : (
            <p className="text-red-500">تصویر موجود نیست</p>
          )}
        </div>
        <div className="w-full lg:w-1/2 pr-6">
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600">
                {product.description}
            </p>
            <p className="text-green-600 lg:font-bold mt-4 text-lg sm:text-xl">
                قیمت: {product.price.toLocaleString()} تومان
            </p>
            </div>
            <div>
            <button 
                className="bg-green-500 text-white m-2 sm:m-4 lg:m-6 lg:text-2xl rounded mt-4 hover:bg-green-600 cursor-pointer transition-all duration-300"
                onClick={() => addToCart({ ...product, quantity: 1 })}
            >
                افزودن به سبد خرید 🛒
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;