import React, { useEffect, useState } from "react";
import { API_KEY } from "../utils/APIclientHome";
import axios from "axios";
import { getPhotos } from "../utils/getPhotos";

function Results(props) {
  // const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

  useEffect(() => {
    const query = props.location.search.slice(3);
    let mounted = true;
    axios
      .get(
        `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&text=${query}&per_page=20&format=json&nojsoncallback=1`
      )
      .then((res) => {
        if (mounted) {
          // console.log(res);
          const imagesArray = getPhotos(res);
          setImages(imagesArray);
        }
      });
    return () => (mounted = false);
  }, []);

  return <h1>Results</h1>;
}

export default Results;
