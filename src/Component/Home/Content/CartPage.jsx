import React, { useContext } from "react";
import Nav from "../Nav/Nav";
import ShoppingList from "./ShoppingList";
import useFetchAllData from "./useFetchAllData";
const CartPage = () => {
  const { search, setSearch } = useFetchAllData();
  return (
    <div>
      <Nav search={search} setSearch={setSearch} />
      <ShoppingList search={search} setSearch={setSearch} />
    </div>
  );
};

export default CartPage;
