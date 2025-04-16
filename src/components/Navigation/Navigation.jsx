import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav style={{ padding: 20 }}>
      <NavLink to="/" style={{ marginRight: 20 }}>Home</NavLink>
      <NavLink to="/movies">Movies</NavLink>
    </nav>
  );
};

export default Navigation;