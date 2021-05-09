import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";
import { API_KEY } from "../utils/APIclientHome";
import { getPhotos } from "../utils/getPhotos";

function Results(props) {
  // const [query, getSearc] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const queryString = props.location.search.slice(3);

  useEffect(() => {
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${queryString}&per_page=20&page=${page}&safe_search=1&content_type=1&format=json&nojsoncallback=1`
      )
      .then((res) => {
        console.log("API Called", page);
        const imagesArray = getPhotos(res);
        setImages((old) => [...old, ...imagesArray]);
      });
  }, [page]);

  window.onscroll = _.debounce(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (clientHeight + scrollTop >= scrollHeight - 5) {
      setPage((page) => page + 1);
    }
  }, 1000);

  return (
    <>
      <section id="results">
        <div></div>
        {images.map((photo, i) => {
          return (
            <div key={i}>
              <img src={photo} style={{ height: 384, width: 512 }} />
            </div>
          );
        })}
        <div></div>
      </section>
    </>
  );
}

export default Results;
