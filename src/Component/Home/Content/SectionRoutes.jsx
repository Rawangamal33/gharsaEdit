import { Route, Routes } from "react-router-dom";
import Nav from "../Nav/Nav";
import Favourite from "./Favourite";
import MostSell from "./MostSell";
import Sales from "./Sales";
import useFetchAllData from "./useFetchAllData";

const SectionRoutes = () => {
  const { data, setData, loading, fetchError, search, setSearch } =
    useFetchAllData();
  return (
    <div>
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route path="favourite" element={<Favourite search={search} />} />
        <Route
          path="mostSell"
          element={
            <MostSell
              data={data}
              setData={setData}
              loading={loading}
              fetchError={fetchError}
              search={search}
            />
          }
        />
        <Route
          path="sales"
          element={
            <Sales
              data={data}
              setData={setData}
              loading={loading}
              fetchError={fetchError}
              search={search}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default SectionRoutes;
