import { useEffect, useState, useCallback } from "react";
import useLoader from "./useLoader";
import { GetTransactions } from "../services/services";

const useTransaction = () => {
  const [data, setData] = useState([]);
  const [setLoader, LoaderComp] = useLoader(false);

  const fetchTransactions = useCallback(async () => {
    setLoader(true);
    try {
      const response = await GetTransactions();
      const { data } = response; // Destructure data directly from response
      setData(data);
    } catch (error) {
      console.error("Failed to fetch transactions:", error); // Enhanced error message
    } finally {
      setLoader(false);
    }
  }, [setLoader]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]); // Dependency array includes fetchTransactions

  return { data, LoaderComp, setLoader, fetchTransactions };
};

export default useTransaction;
