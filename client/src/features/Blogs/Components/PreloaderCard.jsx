import React from "react";
import Skeleton from "react-loading-skeleton";

function PreloaderCard() {
  const dummy = [1, 2, 3, 4];
  return (
    <article className="grid   relative z-[5] xs:grid-cols-2 sm:grid-cols-3   gap-4">
      {dummy.map((d, i) => (
        <div key={d} className="  cursor-pointer  relative  bg-primary grid gap-4  rounded-xl border border-slate-700">
          <div  className="relative">
            <Skeleton
            
              baseColor="#11101d"
              highlightColor="#11101df2"
              className="bg-black-gradient rounded-t-xl opacity-50   h-[250px] grid place-items-center"
            />
            <div className="flex flex-col justify-center px-2 pt-2 bg-primary rounded-b-xl">
              <Skeleton className="text-2xl font-bold text-white mb-5" />
              <Skeleton count={3} className={` `} />
              <Skeleton width={100} className="  mt-3 w-[100px] " />
              <Skeleton width={150} className="text-dimWhite  mb-5" />
            </div>
          </div>
        </div>
      ))}
    </article>
  );
}

export default PreloaderCard;
