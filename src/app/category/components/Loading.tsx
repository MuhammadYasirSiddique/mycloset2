import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="text-center mt-10 h-52 text-slate-60">
      <div className="font-bold text-2xl p-4 rounded-md flex items-center justify-center">
        <Image
          src="/loading.gif"
          alt="Loading..."
          className="mr-2"
          height={100}
          width={100}
        />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
