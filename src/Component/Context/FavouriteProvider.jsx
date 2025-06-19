import { createContext, useEffect, useState } from "react";

export const FavouriteContext = createContext();

const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const storedFavourites =
      JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(storedFavourites);
  }, []);

  const handleFavourite = (item) => {
    if (!favourites.some((fav) => fav.id === item.id)) {
      setFavourites([...favourites, item]);
      alert("Item added to favourites ⭐");
    } else {
      let updatedFav = favourites.filter((one) => {
        return one.id !== item.id;
      });
      setFavourites(updatedFav);

      alert("Item deleted from favourites ⭐");
    }
    localStorage.setItem("favourites", JSON.stringify(updatedFav));
  };
  return (
    <FavouriteContext.Provider value={{ favourites, handleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export default FavouriteProvider;
