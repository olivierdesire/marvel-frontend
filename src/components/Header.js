import logo from "../assets/img/Marvel.png";
import { Link } from "react-router-dom";
import useSound from "use-sound";
import boopSfx from "../assets/sound/marvel-intro.mp3";
import { useState } from "react";
const Header = ({ search, setSearch, pages, setPages, origin, setOrigin }) => {
  const [playmusic, setPlaymusic] = useState(false);
  const [play, { stop }] = useSound(boopSfx);

  return (
    <header>
      <div className="container">
        <div>
          <Link
            to="/"
            onClick={() => {
              setOrigin((current) => "Characters");
              setPages((current) => 1);
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
                  setOrigin((current) => "Characters");
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
                  setOrigin((current) => "Comics");
                }}
              >
                Comics
              </button>
            </Link>
            <Link to="/Favoris">
              <button
                className={
                  origin === "Favoris"
                    ? "color-button-red"
                    : "color-button-white"
                }
                onClick={() => {
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
          <p className="color-button-red-margin">Thème initiative</p>
          {playmusic ? (
            <button
              className="sound-button"
              onClick={() => {
                stop();
                setPlaymusic(false);
              }}
            >
              ⏹️
            </button>
          ) : (
            <button
              className="sound-button"
              onClick={() => {
                play();
                setPlaymusic(true);
              }}
            >
              ▶️
            </button>
          )}
        </div>
        <div>
          <div
            className={origin !== "Favoris" ? "page visible" : "page unvisible"}
          >
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
