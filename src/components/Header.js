import logo from "../assets/img/Marvel.png";
import { Link } from "react-router-dom";

const Header = ({
  search,
  setSearch,
  pages,
  setPages,
  setFavoris,
  origin,
  setOrigin,
}) => {
  return (
    <header>
      <div className="container">
        <div>
          <Link
            to="/"
            onClick={() => {
              setFavoris((current) => false);
              setOrigin((current) => "Personnages");
            }}
          >
            <img src={logo} alt="logo Marvel" />
          </Link>
        </div>
        <div>
          <div>
            <Link to="/">
              <button
                className={
                  origin === "Personnages"
                    ? "color-button-red"
                    : "color-button-white"
                }
                onClick={() => {
                  setFavoris((current) => false);
                  setOrigin((current) => "Personnages");
                }}
              >
                Personnages
              </button>
            </Link>
            <Link to="/Comics">
              <button
                className={
                  origin === "Comics"
                    ? "color-button-red"
                    : "color-button-white"
                }
                onClick={() => {
                  setFavoris((current) => false);
                  setOrigin((current) => "Comics");
                }}
              >
                Comics
              </button>
            </Link>
            {console.log(origin)}
            <Link to={origin === "Comics" ? "/Comics" : "/"}>
              <button
                className={
                  origin === "Favoris"
                    ? "color-button-red"
                    : "color-button-white"
                }
                onClick={() => {
                  setFavoris((current) => true);
                  setOrigin((current) => "Favoris");
                }}
              >
                Favoris
              </button>
            </Link>
          </div>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Entrer votre recherche"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
            }}
          />
        </div>
        <div>
          <div className="page">
            <p>page</p>
            <button
              className={
                pages === 1 ? "button-left unvisible" : "button-left visible"
              }
              onClick={() => {
                setPages(pages - 1);
              }}
            >
              ＜
            </button>
            <p>{pages}</p>
            <button
              className="button-right"
              onClick={() => {
                setPages(pages + 1);
              }}
            >
              ＞
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
