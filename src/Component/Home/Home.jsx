import Nav from "./Nav/Nav";
import Content from "./Content/Content";
import useFetchAllData from "./Content/useFetchAllData";

const Home = () => {
  const { data, setData, search, setSearch } = useFetchAllData();
  return (
    <div>
      <Nav search={search} setSearch={setSearch} />
      <Content search={search} data={data} setData={setData} />
    </div>
  );
};

export default Home;
