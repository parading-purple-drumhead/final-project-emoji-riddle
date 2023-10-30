import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar-component">
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand text-white">
            Emoji Riddle With Friends
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
