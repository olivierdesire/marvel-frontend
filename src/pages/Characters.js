import { useState, useEffect } from "react";
import axios from "axios";

const Characters = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://site--marvel-backend--97yqlpf4l44b.code.run/characters"
          // "https://site--backteste--7s5gbyff4tc7.code.run/characters"
          // "http://localhost:3001/characters"
        );
        console.log("response.data >>", response.data.results);
        setData(response.data.results);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <div>Downloading</div>
  ) : (
    <div>
      {data.map((element, index) => {
        return (
          <img
            key={index}
            src={
              element.thumbnail.path +
              "/portrait_xlarge." +
              element.thumbnail.extension
            }
            alt=""
          />
        );
      })}
    </div>
  );
};

export default Characters;
