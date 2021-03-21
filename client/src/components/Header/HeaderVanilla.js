import { NavLink } from 'react-router-dom';
import './Header.css'

function HeaderVanilla() {
    return (
        <nav>
            <div className="container">
                <ul>
                    <li><NavLink className="navbar-brand" to="/">All for you...</NavLink></li>
                    <li>
                        <div className="nav-dropdown">
                            <button className="dropbtn">Моят профил</button>
                            <div className="dropdown-content">
                                <NavLink className="dropdown-item" to="/profile">Профил</NavLink>
                                <NavLink className="dropdown-item" to="/personal-products">Обяви</NavLink>
                                <NavLink className="dropdown-item" to="/messages">Съобщения</NavLink>
                                <NavLink className="dropdown-item" to="/favourites">Любими</NavLink>
                                <hr />
                                <NavLink className="dropdown-item" to="/logout">Изход</NavLink>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default HeaderVanilla;