import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { API_KEY } from "../utils/APIclientHome";
import { getPhotos } from "../utils/getPhotos";
import { useHistory } from "react-router-dom";

function Results(props) {
  const queryString = props.location.search.slice(3);
  const [query, setQuery] = useState(queryString);
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${query}&per_page=20&page=${page}&safe_search=1&content_type=1&format=json&nojsoncallback=1`
      )
      .then((res) => {
        const imagesArray = getPhotos(res);
        setImages((old) => [...old, ...imagesArray]);
      });
  }, [page]);

  const handleSubmit = (e) => {
    setPage(2);
    const params = new URLSearchParams();
    params.append("q", query);
    history.push({ search: params.toString() });

    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${query}&per_page=20&page=1&safe_search=1&content_type=1&format=json&nojsoncallback=1`
      )
      .then((res) => {
        const imagesArray = getPhotos(res);
        setImages(imagesArray);
        // setLoading(false);
      });
  };

  window.onscroll = _.debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setLoading(true);
      setPage((page) => page + 1);
    }
  }, 1000);

  return (
    <>
      <main className="pt-6" id="results">
        <div className="container px-5 pt-5 mx-auto mb-8 flex items-center justify-center whitespace-nowrap">
          <p className="absolute bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 sm:text-5xl text-3xl font-black">
            Awesome Gallery
          </p>
        </div>
        <div className="container px-5 pt-5 mx-auto mb-12">
          <div class="bg-white shadow-xl p-4 flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="grey"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              class="w-full rounded p-2 focus:outline-none"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Try 'Sunrise'"
            />
            <button
              onClick={handleSubmit}
              class="bg-blue-500 hover:bg-blue-400 focus:outline-none rounded text-white p-2 pl-4 pr-4"
            >
              <p class="font-semibold text-xs">Search</p>
            </button>
          </div>
          <div className="box-border mx-auto md:masonry before:box-inherit after:box-inherit">
            {images.map((image) => (
              <>
                <div class="py-2 rounded-lg break-inside hover:shadow-xl">
                  <img
                    src={image}
                    className="bg-contain rounded"
                    alt="gallery"
                  />
                </div>
              </>
            ))}
          </div>
          {loading ? (
            <>
              <span class="relative text-blue-500 opacity-75 w-full h-0">
                <i class="flex items-center justify-center fas fa-circle-notch fa-spin fa-5x"></i>
              </span>
            </>
          ) : null}
        </div>
      </main>
    </>
  );
}

export default Results;
