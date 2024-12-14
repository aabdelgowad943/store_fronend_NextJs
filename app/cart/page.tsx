// "use client";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import { useCart } from "@/app/context/CartContext"; // Import CartContext
// import { removeItemFromCart } from "@/utils/actions"; // Import removeItemFromCart function
// import { toast } from "@/hooks/use-toast";

// const CartPage = () => {
//   const { cartItems, setCartItems, totalPrice } = useCart(); // Access CartContext
//   const [error, setError] = useState<string>("");
//   const [showPopup, setShowPopup] = useState(false);
//   const [voucherCode, setVoucherCode] = useState<string>("");
//   const [voucherMessage, setVoucherMessage] = useState<string>("");

//   // If cartItems is empty, give a message or take action
//   useEffect(() => {
//     if (!cartItems) {
//       setError("No cart items found");
//     }
//   }, [cartItems]);

//   const handleQuantityChange = (id: string, quantity: number) => {
//     const updatedCart = cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: Math.max(quantity, 1) } : item
//     );
//     setCartItems(updatedCart);
//   };

//   const removeItem = async (id: string) => {
//     try {
//       const success = await removeItemFromCart(id); // Call the removeItemFromCart utility
//       if (success) {
//         // Remove item from local state if successful in the database
//         setCartItems((prevItems) =>
//           prevItems.filter((item): boolean => item.id !== id)
//         );
//         toast({ description: "Item removed from cart" });
//       } else {
//         toast({ description: "Failed to remove item from the cart" });
//       }
//     } catch (error) {
//       toast({ description: "Failed to remove item from the cart" });
//     }
//   };

//   const handleCheckout = async () => {
//     if (voucherCode.trim() === "") {
//       toast({ description: "Please enter a voucher code." });
//       return;
//     }

//     try {
//       // Implement voucher code validation logic here
//       setVoucherMessage("Voucher is being validated...");

//       // Sample check (replace with actual validation logic)
//       if (voucherCode === "VALID") {
//         setVoucherMessage("Voucher code applied successfully!");
//       } else {
//         setVoucherMessage("Invalid voucher code");
//       }
//     } catch (error) {
//       console.error("Error validating voucher code:", error);
//       setVoucherMessage("An error occurred while validating the voucher code.");
//     }
//   };

//   const openPopup = () => setShowPopup(true);
//   const closePopup = () => {
//     setShowPopup(false);
//     setVoucherCode("");
//     setVoucherMessage("");
//   };

//   if (error) {
//     return <p className="text-red-500">Error: {error}</p>;
//   }

//   return (
//     <section className="p-10">
//       <div className="max-w-7xl mx-auto my-20 px-4">
//         <h1 className="text-3xl font-bold mb-8 text-center dark:text-white text-black">
//           Your books in the cart
//         </h1>

//         {cartItems.length > 0 ? (
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             <div className="lg:col-span-2">
//               {cartItems.map((item) => (
//                 <div
//                   key={item.id}
//                   className="border p-4 rounded-lg shadow-md flex gap-4 items-center mb-4"
//                 >
//                   <Image
//                     src={item.book.fileUrl}
//                     alt={item.book.title}
//                     width={100}
//                     height={100}
//                     className="w-24 h-24 object-cover rounded-md"
//                   />
//                   <div className="flex-1">
//                     <h2 className="text-lg font-semibold">{item.book.title}</h2>
//                     <p className="text-gray-600">Price: {item.book.price} $</p>
//                     <div className="flex items-center mt-2 gap-4">
//                       <input
//                         type="number"
//                         className="w-16 border border-gray-300 text-center py-1 rounded-md"
//                         value={item.quantity}
//                         min="1"
//                         onChange={(e) =>
//                           handleQuantityChange(
//                             item.id,
//                             parseInt(e.target.value)
//                           )
//                         }
//                       />
//                       <button
//                         onClick={() => removeItem(item.id)}
//                         className="text-red-500 hover:underline"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   </div>
//                   <p className="text-lg font-bold">
//                     ${(item.book.price * item.quantity).toFixed(2)}
//                   </p>
//                 </div>
//               ))}
//             </div>

//             <div className="border p-6 rounded-lg shadow-md">
//               <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
//               <div className="flex justify-between items-center mb-4">
//                 <p>Subtotal</p>
//                 <p className="font-bold">${totalPrice.toFixed(2)}</p>
//               </div>
//               <div className="flex justify-between items-center mb-4">
//                 <p>Shipping</p>
//                 <p className="font-bold">Free</p>
//               </div>
//               <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
//                 <p className="text-lg font-semibold">Total</p>
//                 <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
//               </div>
//               <button
//                 className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
//                 onClick={openPopup}
//               >
//                 Proceed to Checkout
//               </button>
//             </div>
//           </div>
//         ) : (
//           <p className="text-center text-gray-600 mt-12">
//             Your cart is empty.{" "}
//             <a href="/" className="text-blue-600 hover:underline">
//               Continue shopping
//             </a>
//             .
//           </p>
//         )}
//       </div>

//       {/* Popup for Voucher Code */}
//       {showPopup && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
//             <h2 className="text-xl text-black font-bold mb-4">
//               Enter Voucher Code
//             </h2>
//             <input
//               type="text"
//               className="border border-gray-300 bg-white outline-none text-black w-full px-4 py-2 rounded-md mb-4"
//               placeholder="Voucher Code"
//               value={voucherCode}
//               onChange={(e) => setVoucherCode(e.target.value)}
//             />
//             <button
//               className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-4"
//               onClick={handleCheckout}
//             >
//               Check Voucher
//             </button>
//             {voucherMessage && (
//               <p className="text-center text-lg font-semibold mt-4">
//                 {voucherMessage}
//               </p>
//             )}
//             <button
//               className="w-full bg-red-500 hover:bg-red-600 transition-all text-white py-2 rounded-md "
//               onClick={closePopup}
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default CartPage;

"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { removeItemFromCart } from "@/utils/actions";
import { toast } from "@/hooks/use-toast";
import { updateCartQuantity } from "@/utils/actions"; // Import the new updateCartQuantity function

const CartPage = () => {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [error, setError] = useState<string>("");
  const [showPopup, setShowPopup] = useState(false);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherMessage, setVoucherMessage] = useState<string>("");

  useEffect(() => {
    if (!cartItems) {
      setError("No cart items found");
    }
  }, [cartItems]);

  const handleQuantityChange = async (id: string, quantity: number) => {
    if (quantity < 1) return; // Prevent setting quantity less than 1
    try {
      // Update the quantity in the database
      const updateResponse = await updateCartQuantity(id, quantity);
      if (updateResponse.success) {
        // Update the quantity in local state
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === id ? { ...item, quantity } : item
          )
        );
        toast({ description: "Quantity updated successfully!" });
      } else {
        toast({ description: updateResponse.message });
      }
    } catch (error) {
      toast({ description: "Failed to update quantity." });
    }
  };

  const removeItem = async (id: string) => {
    try {
      const success = await removeItemFromCart(id);
      if (success) {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
        toast({ description: "Item removed from cart" });
      } else {
        toast({ description: "Failed to remove item from the cart" });
      }
    } catch (error) {
      toast({ description: "Failed to remove item from the cart" });
    }
  };

  const handleCheckout = async () => {
    if (voucherCode.trim() === "") {
      toast({ description: "Please enter a voucher code." });
      return;
    }

    try {
      setVoucherMessage("Voucher is being validated...");
      if (voucherCode === "VALID") {
        setVoucherMessage("Voucher code applied successfully!");
      } else {
        setVoucherMessage("Invalid voucher code");
      }
    } catch (error) {
      console.error("Error validating voucher code:", error);
      setVoucherMessage("An error occurred while validating the voucher code.");
    }
  };

  const openPopup = () => setShowPopup(true);
  const closePopup = () => {
    setShowPopup(false);
    setVoucherCode("");
    setVoucherMessage("");
  };

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <section className="p-10">
      <div className="max-w-7xl mx-auto my-20 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center dark:text-white text-black">
          Your books in the cart
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="border p-4 rounded-lg shadow-md flex gap-4 items-center mb-4"
                >
                  <Image
                    src={item.book.fileUrl}
                    alt={item.book.title}
                    width={100}
                    height={100}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.book.title}</h2>
                    <p className="text-gray-600">Price: {item.book.price} $</p>
                    <div className="flex items-center mt-2 gap-4">
                      <input
                        type="number"
                        className="w-16 border border-gray-300 text-center py-1 rounded-md"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-lg font-bold">
                    ${(item.book.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between items-center mb-4">
                <p>Subtotal</p>
                <p className="font-bold">${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between items-center mb-4">
                <p>Shipping</p>
                <p className="font-bold">Free</p>
              </div>
              <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                <p className="text-lg font-semibold">Total</p>
                <p className="text-lg font-bold">${totalPrice.toFixed(2)}</p>
              </div>
              <button
                className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
                onClick={openPopup}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-12">
            Your cart is empty.{" "}
            <a href="/" className="text-blue-600 hover:underline">
              Continue shopping
            </a>
            .
          </p>
        )}
      </div>

      {/* Popup for Voucher Code */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl text-black font-bold mb-4">
              Enter Voucher Code
            </h2>
            <input
              type="text"
              className="border border-gray-300 bg-white outline-none text-black w-full px-4 py-2 rounded-md mb-4"
              placeholder="Voucher Code"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value)}
            />
            <button
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition mb-4"
              onClick={handleCheckout}
            >
              Check Voucher
            </button>
            {voucherMessage && (
              <p className="text-center text-lg font-semibold mt-4">
                {voucherMessage}
              </p>
            )}
            <button
              className="w-full bg-red-500 hover:bg-red-600 transition-all text-white py-2 rounded-md "
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CartPage;
