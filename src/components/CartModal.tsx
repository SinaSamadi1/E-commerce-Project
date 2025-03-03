'use client';

import { useCartStore } from "@/store/cartStore";
import { useState } from "react";

const CartModal = () => {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button 
        className="fixed top-4 right-4 bg-blue-500 text-white p-2 rounded"
        onClick={() => setIsOpen(true)}
      >
        🛒 مشاهده سبد ({cart.length})
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">🛍️ سبد خرید</h2>

            {cart.length === 0 ? (
              <div className="flex justify-between items-center">
                <p>سبد خرید خالی است!</p>
                <button 
                  className="text-red-500"
                  onClick={handleCloseModal}
                >
                  بستن
                </button>
              </div>
            ) : (
              <>
                <ul>
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between p-2 border-b">
                      <span>{item.name} x {item.quantity}</span>
                      <button 
                        className="text-red-500" 
                        onClick={() => removeFromCart(item.id)}
                      >
                        ❌
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-bold">
                  مجموع: {cart.reduce((total, item) => total + item.price * item.quantity, 0).toLocaleString()} تومان
                </p>

                <div className="flex justify-between mt-4">
                  <button 
                    className={`bg-gray-400 text-white px-4 py-2 rounded ${cart.length === 0 && 'cursor-not-allowed'}`} 
                    onClick={handleCloseModal}
                    disabled={cart.length === 0}
                  >
                    بستن
                  </button>
                  <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={clearCart}>🗑️ حذف همه</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;