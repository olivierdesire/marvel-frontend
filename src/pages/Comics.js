import { useState, useEffect } from "react";
import axios from "axios";

const Comics = ({ search, pages }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
        const response = await axios.get(
          `https://site--marvel-backend--97yqlpf4l44b.code.run/comics${filters}`
          //`http://localhost:3001/comics${filters}`
        );
        setData(response.data.results);
        setIsLoading(false);

        // console.log("response.data >>", response.data.results);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [search, pages]);

  return isLoading ? (
    <div>Downloading</div>
  ) : (
    <div className="comic-page">
      <div className="comic-title container">
        <h1>Comics</h1>
      </div>
      <div className="list-comics container">
        {data.map((element) => {
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

export default Comics;
