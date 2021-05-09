import React, { useEffect, useState } from "react";
import APIclientHome from "../utils/APIclientHome";
import { getPhotos } from "../utils/getPhotos";

function Home(props) {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    let mounted = true;
    APIclientHome()
      .get()
      .then((res) => {
        if (mounted) {
          const imagesArray = getPhotos(res);
          setImages(imagesArray);
        }
      });
    return () => (mounted = false);
  }, []);
  return (
    <>
      <section className="flex h-screen" id="landing-page">
        <div className="container flex flex-col mx-auto my-auto">
          <div className="relative mx-auto">
            <div className="flex flex-wrap sm:w-full lg:w-4/6 xl:w-3/6 mx-auto">
              <div className="flex flex-wrap md:-m-2 -m-1">
                <div className="flex flex-wrap w-1/2">
                  <div className="md:p-2 h-32 w-64 p-1 w-1/2">
                    <img
                      alt="gallery"
                      className="w-full bg-contain h-full object-center block rounded filter brightness-50"
                      src={images[0]}
                    />
                  </div>
                  <div className="md:p-2 h-32 w-64 p-1 w-1/2">
                    <img
                      alt="gallery"
                      className="w-full bg-contain h-full object-center block rounded filter brightness-50"
                      src={images[1]}
                    />
                  </div>
                  <div className="md:p-2 h-64 w-128 p-1 w-full">
                    <img
                      alt="gallery"
                      className="w-full h-full bg-contain object-center block rounded filter brightness-50"
                      src={images[2]}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap w-1/2">
                  <div className="md:p-2 h-64 w-128 p-1 w-full">
                    <img
                      alt="gallery"
                      className="w-full h-full bg-contain object-center block rounded filter brightness-50"
                      src={images[3]}
                    />
                  </div>
                  <div className="md:p-2 h-32 w-64 p-1 w-1/2">
                    <img
                      alt="gallery"
                      className="w-full bg-contain h-full object-center block rounded filter brightness-50"
                      src={images[4]}
                    />
                  </div>
                  <div className="md:p-2 h-32 w-64 p-1 w-1/2">
                    <img
                      alt="gallery"
                      className="w-full bg-contain h-full object-center block rounded filter brightness-50"
                      src={images[5]}
                    />
                  </div>
                </div>
              </div>
              <div className="absolute self-center text-center md:ml-40 lg:ml-32 xl:ml-32">
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-500 text-5xl font-black">
                  Awesome Gallery
                </p>
              </div>
            </div>
          </div>
          <div className="pt-8 flex mx-auto">
            <div className="bg-white flex rounded-full shadow-xl">
              <input
                className="rounded-l-full w-full px-6 text-gray-700 leading-tight focus:outline-none"
                id="search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
              />
              <div className="p-4">
                <button
                  onClick={() => props.history.push(`/results?q=${query}`)}
                  className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
