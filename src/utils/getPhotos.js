export const getPhotos = (res) => {
  return res.data.photos.photo.map(
    ({ farm, server, id, secret }) =>
      `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`
  );
};
