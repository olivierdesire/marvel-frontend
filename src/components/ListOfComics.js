import { useState, useEffect } from "react";
import axios from "axios";

const ComicsCharacter = ({ baseURL, character }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sizeSmallPicture = "/portrait_medium.";

  const characterID = character._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/comics/${characterID}`);
        setData(response.data.comics);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [baseURL, characterID]);

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
