import logo from "../assets/img/Marvel.png";
import { Link } from "react-router-dom";

const Header = ({ search, setSearch, pages, setPages }) => {
  return (
    <header>
      <div className="container">
        <div>
          <Link to="/">
            <img src={logo} alt="logo Marvel" />
          </Link>
        </div>
        <div>
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
        <div>
          <Link to="/">
            <button>Personnages</button>
          </Link>
          <Link to="/Comics">
            <button>Comics</button>
          </Link>
          <button>test 3</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
