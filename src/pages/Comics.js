import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Comics = ({ baseURL, search, pages }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isFavoris, setIsFavoris] = useState(false);

  const sizePicture = "/portrait_uncanny.";

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";
      if (pages > 1 && !search) {
        filters = "?skip=" + (pages - 1) * 100;
      } else {
        if (search) {
          filters = "?title=" + search;
        }
      }
      try {
        const response = await axios.get(`${baseURL}/comics${filters}`);
        setData(response.data.results);
        setIsLoading(false);

        console.log("response.data >>", response.data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [baseURL, search, pages]);

  return isLoading ? (
    <div>Downloading</div>
  ) : (
    <div className="comic-page">
      <div className="comic-title container">
        <h1>Comics</h1>
      </div>
      <div className="list-comics container">
        {data.map((element) => {
          let cookieStar = false;
          if (Cookies.get(`${element._id}`)) {
            cookieStar = true;
          }
          return (
            <div key={element._id} className="comic">
              <img
                src={
                  element.thumbnail.path +
                  sizePicture +
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
                {/* <button
                  className={
                    cookieStar
                      ? "favoris-comics color-red"
                      : "favoris-comics color-grey"
                  }
                  onClick={() => {
                    if (Cookies.get(`${element._id}`)) {
                      Cookies.remove(`${element._id}`);
                      setIsFavoris((current) => !current);
                    } else {
                      Cookies.set(`${element._id}`, element.title);
                      setIsFavoris((current) => !current);
                    }
                  }}
                >
                  ⭑
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comics;
