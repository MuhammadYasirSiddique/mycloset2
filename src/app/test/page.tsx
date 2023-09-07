"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const notify = () => {
    toast.error("This is a ERROR notification!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000, // Close the notification after 3 seconds (ms)
    });
  };

  return (
    <div className="App">
      <h1>React Toastify Example</h1>
      <Button onClick={notify}>Show Notification</Button>

      <ToastContainer />
    </div>
  );
}

export default App;
