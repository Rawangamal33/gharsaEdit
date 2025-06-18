import Header from "./Header.jsx";
import FirstSec from "./FirstSec.jsx";
import SecondSec from "./SecondSec.jsx";
import ThirdSec from "./ThirdSec.jsx";
import JoinUs from "./JoinUs.jsx";
import Ad from "./Ad.jsx";

const Content = ({ search, data, setData }) => {
  return (
    <div>
      <Header />
      <FirstSec search={search} />
      <SecondSec data={data} setData={setData} search={search} />
      <ThirdSec data={data} setData={setData} search={search} />
      <JoinUs />
      <Ad />
    </div>
  );
};

export default Content;
