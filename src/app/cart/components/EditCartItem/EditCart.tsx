"use client";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";
import { cartAction } from "@/redux/features/cartSlice";
import { toast } from "react-toastify";

interface EditCartItemProps {
  onClose: () => void;
  productId: string
  unitPrice: number ;
}

const EditCartItem: React.FC<EditCartItemProps> = ({ onClose, productId, unitPrice }) => {
  // State to track the edited quantity
  const qtyForEdit = useAppSelector((state) => {
    // Use the productId to find the quantity of the specific item in the cart
    const cartItem = state.cart.items.find((item) => item._id === productId);
    return cartItem ? cartItem.qty : 0; // Default to 0 if the item is not found
  });

  const dispatch = useAppDispatch();
  const [newQty, setNewQty] = useState(qtyForEdit);

  // const [editedSize, setEditedSize] = useState("");

  // Function to handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const editedQty = parseInt(e.target.value, 10);
    setNewQty(editedQty);


    
  };
  // const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const newSize = parseInt(e.target.value, 10);
  //   setEditedQty(newSize);
  // };

  // Function to save the edited quantity and close the pop-up /////// newQty: number, itemId: string
  const saveEdit = async () => {
    // You can implement the logic to update the cart item's quantity here
    // Example: call an API to update the quantity
     // After updating, you can close the pop-up
     onClose();
   
     // Calculate the new total price after updating the quantity
    const totalPrice = newQty * unitPrice;

    // Dispatch an action to update the Redux store with the new total price

    dispatch(
      cartAction.updateQuantity({
        productId: productId,
        newQty: newQty ,

      })
    )
  
    
    try {
      if (newQty) {
        const res = await fetch("/api/cart", {
          method: "PUT",
          body: JSON.stringify({
            product_id: productId,
            qty: newQty,
            price: totalPrice,
            // size: cartItem.size,
          }),
          
        });
        if (!res.ok) {
          throw new Error("Failed to Update Qty in cart");
        }
        
      }
    } catch (error) {
      console.log(error);
    }
  ;
   
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Edit</h2>
        <div className="mb-4">
          <label htmlFor="editedQty" className="block mb-2">
            New Quantity:
          </label>
          <input
            type="number"
            id="editedQty"
            className="border border-gray-300 rounded w-full px-3 py-2"
            value={newQty}
            onChange={handleQuantityChange}
          />
        </div>
        {/* <div className="mb-4">
          <label htmlFor="editedSize" className="block mb-2">
            New Size:
          </label>
          <input
            type="string"
            id="editedSize"
            className="border border-gray-300 rounded w-full px-3 py-2"
            value={editedQty}
            onChange={handleSizeChange}
          />
        </div> */}
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={() =>{
              toast.promise(
                saveEdit(),
                {
                  pending: "Updating quantity",
                  success: "Quantity updated",
                  error: "Failed to update quantity",
                }
              );
            }
          }
          >
            Update
          </button>
          <button
            className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCartItem;
