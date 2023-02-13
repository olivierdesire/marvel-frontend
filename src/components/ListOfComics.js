import { useState, useEffect } from "react";
import axios from "axios";

const ComicsCharacter = ({ characterID }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sizeSmallPicture = "/portrait_medium.";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--97yqlpf4l44b.code.run/comics/${characterID}`
          // `http://localhost:3001/comics/${characterID}`
        );
        console.log("response.data >>", response.data.comics);
        setData(response.data.comics);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [characterID]);

  return isLoading ? (
    <p>Downloading</p>
  ) : (
    <div className="carroussel">
      {data.map((element) => {
        return (
          <img
            key={element._id}
            src={
              element.thumbnail.path +
              sizeSmallPicture +
              element.thumbnail.extension
            }
            alt="comics of character"
          />
        );
      })}
    </div>
  );
};

export default ComicsCharacter;