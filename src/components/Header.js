import logo from "../assets/img/Marvel.png";
const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="logo Marvel" />
        <div>
          <button>test 1</button>
          <button>test 2</button>
          <button>test 3</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
