import { useState, useEffect } from "react";

const Favoris = ({ baseURL }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // favoris comics
    };
    fetchData();
  }, [baseURL]);

  return <div>Favoris</div>;
};

export default Favoris;
