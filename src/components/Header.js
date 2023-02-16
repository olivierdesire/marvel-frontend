import logo from "../assets/img/Marvel.png";
import { Link } from "react-router-dom";
import ComicsCharacter from "./ListOfComics";

const Header = ({
  search,
  setSearch,
  pages,
  setPages,
  setFavoris,
  origin,
  setOrigin,
  currentPage,
  setCurrentPage,
}) => {
  return (
    <header>
      <div className="container">
        <div>
          <Link
            to="/"
            onClick={() => {
              setFavoris((current) => false);
              setOrigin((current) => "Characters");
              setCurrentPage((current) => "Characters");
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
                  origin === "Characters"
                    ? "color-button-red"
                    : "color-button-white"
                }
                onClick={() => {
                  setFavoris((current) => false);
                  setOrigin((current) => "Characters");
                  setCurrentPage((current) => "Characters");
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
                  setCurrentPage((current) => "Comics");
                }}
              >
                Comics
              </button>
            </Link>
            {console.log(origin)}
            <Link
              to={
                currentPage === "Comics"
                  ? "/Comics"
                  : currentPage === "ComicsCharacter"
                  ? "/Comics"
                  : "/"
              }
            >
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
                setPages((current) => 1);
              }}
            >
              ≪
            </button>
            <button
              className={
                pages === 1 ? "button-left unvisible" : "button-left visible"
              }
              onClick={() => {
                setPages((current) => pages - 1);
              }}
            >
              ﹤
            </button>
            <p>{pages}</p>
            <button
              className="button-right"
              onClick={() => {
                setPages((current) => pages + 1);
              }}
            >
              ﹥
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
