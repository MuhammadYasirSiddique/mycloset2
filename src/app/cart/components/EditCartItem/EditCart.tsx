"use client";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/redux/store";

interface EditCartItemProps {
  onClose: () => void;
  productQty: number;
}

const EditCartItem: React.FC<EditCartItemProps> = ({ onClose, productQty }) => {
  const qtyForEdit = productQty;
  // console.log(qtyForEdit);
  // State to track the edited quantity
  // const qtyForEdit = useAppSelector((state) => {
  //   // Use the productId to find the quantity of the specific item in the cart
  //   const cartItem = state.cart.items.find((item) => item._id === productId);
  //   return cartItem ? cartItem.qty : 0; // Default to 0 if the item is not found
  // });
  const [editedQty, setEditedQty] = useState(0);
  const [editedSize, setEditedSize] = useState("");

  // Function to handle quantity change
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQty = parseInt(e.target.value, 10);
    setEditedQty(newQty);
  };
  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setEditedQty(newSize);
  };

  // Function to save the edited quantity and close the pop-up
  const saveEdit = () => {
    // You can implement the logic to update the cart item's quantity here
    // Example: call an API to update the quantity
    // After updating, you can close the pop-up
    onClose();
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
            value={editedQty}
            onChange={handleQuantityChange}
          />
        </div>
        <div className="mb-4">
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
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={saveEdit}
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
