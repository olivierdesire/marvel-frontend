import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const ComicsCharacter = ({ baseURL, favoris, setIsReloaded }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sizeMaxPicture = "/portrait_uncanny.";
  const sizeSmallPicture = "/portrait_small.";

  const location = useLocation();

  const character = location.state?.character;
  const characterID = location.state?.character._id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}/comics/${characterID}`);
        setData(response.data);
        setIsLoading(false);

        // console.log("response.data >>", response.data.results);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [baseURL, characterID]);

  return isLoading ? (
    <div>Downloading</div>
  ) : (
    <div className="comic-page">
      <div className="comic-title-character container">
        <h1>Comics du personnage</h1>
        <Link
          to="/character"
          state={{ character: character }}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className="link-character">
            <img
              src={
                data.thumbnail.path +
                sizeSmallPicture +
                data.thumbnail.extension
              }
              alt=""
            />
            <p>{data.name}</p>
          </div>
        </Link>
      </div>
      <div className="list-comics container">
        {data.comics.map((element) => {
          let cookieStar = false;
          if (Cookies.get(`${element._id}`)) {
            cookieStar = true;
          }

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
              <div className="col-right">
                <p>{element.title}</p>
                {element.description && <p>Description</p>}
                <div className="overflow-description">
                  <p>{element.description}</p>
                </div>
                <button
                  className={
                    cookieStar
                      ? "favoris-comics color-red"
                      : "favoris-comics color-grey"
                  }
                  onClick={() => {
                    if (Cookies.get(`${element._id}`)) {
                      Cookies.remove(`${element._id}`);
                      favoris.splice(favoris.indexOf(element._id), 1);
                      setIsReloaded((current) => !current);
                    } else {
                      Cookies.set(`${element._id}`, element._id);
                      favoris.push(element._id);
                      setIsReloaded((current) => !current);
                    }
                  }}
                >
                  ⭑
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComicsCharacter;
