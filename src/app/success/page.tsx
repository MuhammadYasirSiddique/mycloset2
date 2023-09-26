'use client'
import SuccessMsg from "@/app/success/components/SuccessMsg";
import NotFoundPage from "@/app/NotFoundPage/page";
import React, { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'; // Updated import for useSearchParams

const Page = () => {
  const searchParams = useSearchParams();
  const success = searchParams?.get('success');

  // Define a state variable to track the success state
  const [isSuccess, setIsSuccess] = useState(success === "true");

  // Effect to reset isSuccess to false after rendering SuccessMsg
  // useEffect(() => {
  //   if (isSuccess) {
  //     setTimeout(() => {
  //       setIsSuccess(false);
  //     }, 5000); // Reset isSuccess to false after 5 seconds
  //   }
  // }, [isSuccess]);

  return (
    <div>
      {isSuccess ? (
        <>
          <SuccessMsg />
         
        </>
      ) : (
        <NotFoundPage />

      )}
    </div>
  );
};

export default Page;
