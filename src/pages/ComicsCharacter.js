import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const ComicsCharacter = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sizeMaxPicture = "/portrait_uncanny.";
  const sizeSmallPicture = "/portrait_small.";

  const location = useLocation();

  const character = location.state?.character;
  const characterID = location.state?.character._id;
  console.log("characterID >>> ", characterID);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://site--marvel-backend--97yqlpf4l44b.code.run/comics/${characterID}`
          // `http://localhost:3001/comics/${characterID}`
        );
        setData(response.data);
        setIsLoading(false);

        // console.log("response.data >>", response.data.results);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [characterID]);

  return isLoading ? (
    <div>Downloading</div>
  ) : (
    <div className="comic-page">
      <div className="comic-title-character container">
        <h1>Comics du personnage</h1>
        <Link to="/character" state={{ character: character }}>
          <img
            src={
              data.thumbnail.path + sizeSmallPicture + data.thumbnail.extension
            }
            alt=""
          />
        </Link>
      </div>
      <div className="list-comics container">
        {data.comics.map((element) => {
          return (
            <div key={element._id} className="comic">
              <img
                src={
                  element.thumbnail.path +
                  sizeMaxPicture +
                  element.thumbnail.extension
                }
                alt="One comic"
              />
              <div>
                <p>{element.title}</p>
                {element.description && <p>Description</p>}
                <p>{element.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicsCharacter;
