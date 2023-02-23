import React from 'react'
import { useRouter } from "next/router";


const ID = () => {
    const id = useRouter().query.id;
    console.log('id', id);
    return (
      <>
    <div class="max-w-lg mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl grid h-screen place-items-center">
      <div class="md:flex">
        <div class="md:shrink-0">
          <img
            class="h-48 w-full object-cover md:h-full md:w-48"
            src="/img/building.jpg"
            alt="Modern building architecture"
          />
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            Company retreats
          </div>
          <a
            href="#"
            class="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            Incredible accommodation for your team
          </a>
          <p class="mt-2 text-slate-500">
            Looking to take your team away on a retreat to enjoy awesome food
            and take in some sunshine? We have a list of places to do just that.
          </p>
        </div>
      </div>
    </div>
      </>
  );
}

export default ID