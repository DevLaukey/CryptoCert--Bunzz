import React from "react";

const CardGrid = () => {
  return (
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3  ">
          <article class="overflow-hidden rounded-lg shadow-lg dark:bg-gray-600 ">
            <a href="#">
              <img
                alt="Placeholder"
                class="block h-auto w-full"
                src="https://picsum.photos/600/400/?random"
              />
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 class="text-lg">
                <a
                  class="no-underline hover:underline text-black dark:text-white"
                  href="#"
                >
                  Article Title
                </a>
              </h1>
              <p class="text-grey-darker text-sm dark:text-white">11/1/19</p>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
              <a
                class="flex items-center no-underline hover:underline text-black"
                href="#"
              >
                <img
                  alt="Placeholder"
                  class="block rounded-full"
                  src="https://picsum.photos/32/32/?random"
                />
                <p class="ml-2 text-sm dark:text-white">Author Name</p>
              </a>
              <a
                class="no-underline text-grey-darker hover:text-red-dark dark:text-white"
                href="#"
              >
                <span class="hidden">Like</span>
                <i class="fa fa-heart"></i>
              </a>
            </footer>
          </article>
        </div>
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3  ">
          <article class="overflow-hidden rounded-lg shadow-lg dark:bg-gray-600 ">
            <a href="#">
              <img
                alt="Placeholder"
                class="block h-auto w-full"
                src="https://picsum.photos/600/400/?random"
              />
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 class="text-lg">
                <a
                  class="no-underline hover:underline text-black dark:text-white"
                  href="#"
                >
                  Article Title
                </a>
              </h1>
              <p class="text-grey-darker text-sm dark:text-white">11/1/19</p>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
              <a
                class="flex items-center no-underline hover:underline text-black"
                href="#"
              >
                <img
                  alt="Placeholder"
                  class="block rounded-full"
                  src="https://picsum.photos/32/32/?random"
                />
                <p class="ml-2 text-sm dark:text-white">Author Name</p>
              </a>
              <a
                class="no-underline text-grey-darker hover:text-red-dark dark:text-white"
                href="#"
              >
                <span class="hidden">Like</span>
                <i class="fa fa-heart"></i>
              </a>
            </footer>
          </article>
        </div>
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3  ">
          <article class="overflow-hidden rounded-lg shadow-lg dark:bg-gray-600 ">
            <a href="#">
              <img
                alt="Placeholder"
                class="block h-auto w-full"
                src="https://picsum.photos/600/400/?random"
              />
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 class="text-lg">
                <a
                  class="no-underline hover:underline text-black dark:text-white"
                  href="#"
                >
                  Article Title
                </a>
              </h1>
              <p class="text-grey-darker text-sm dark:text-white">11/1/19</p>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
              <a
                class="flex items-center no-underline hover:underline text-black"
                href="#"
              >
                <img
                  alt="Placeholder"
                  class="block rounded-full"
                  src="https://picsum.photos/32/32/?random"
                />
                <p class="ml-2 text-sm dark:text-white">Author Name</p>
              </a>
              <a
                class="no-underline text-grey-darker hover:text-red-dark dark:text-white"
                href="#"
              >
                <span class="hidden">Like</span>
                <i class="fa fa-heart"></i>
              </a>
            </footer>
          </article>
        </div>
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3  ">
          <article class="overflow-hidden rounded-lg shadow-lg dark:bg-gray-600 ">
            <a href="#">
              <img src="https://gateway.pinata.cloud/ipfs/Qmc3gWiMKiRhnc61oSL3nR4Dg5NfJArNiQ2DZA6wpppKT4" />
            </a>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 class="text-lg">
                <a
                  class="no-underline hover:underline text-black dark:text-white"
                  href="#"
                >
                  Article Title
                </a>
              </h1>
              <p class="text-grey-darker text-sm dark:text-white">11/1/19</p>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
              <a
                class="flex items-center no-underline hover:underline text-black"
                href="#"
              >
                <img
                  alt="Placeholder"
                  class="block rounded-full"
                  src="https://picsum.photos/32/32/?random"
                />
                <p class="ml-2 text-sm dark:text-white">Author Name</p>
              </a>
              <a
                class="no-underline text-grey-darker hover:text-red-dark dark:text-white"
                href="#"
              >
                <span class="hidden">Like</span>
                <i class="fa fa-heart"></i>
              </a>
            </footer>
          </article>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
