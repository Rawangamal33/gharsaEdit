import axios from "axios";
import { useEffect, useState } from "react";

const useFetchAllData = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchAllDataPages = async () => {
      try {
        let allItems = [];
        let pageIndex = 1;
        let hasMoreData = true;
        while (hasMoreData) {
          const response = await axios.get(
            `https://agricommerce.runasp.net/api/Product?pageIndex=${pageIndex}&pageSize=10`
          );
          if (response.data?.data?.items?.length > 0) {
            allItems = [...allItems, ...response.data.data.items];
            pageIndex++;
          } else {
            hasMoreData = false;
          }
        }
        setData(allItems);
      } catch (err) {
        console.log(err);

        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchAllDataPages();
  }, []);

  return { data, setData, loading, fetchError, search, setSearch };
};

export default useFetchAllData;
