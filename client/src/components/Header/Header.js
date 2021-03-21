import { Navbar, NavDropdown, Nav, Card, CardDeck, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <div className="container">
                <Navbar.Brand><NavLink className="navbar-brand" to="/">All for you...</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <NavDropdown title="Моят профил" id="collasible-nav-dropdown">
                            <NavDropdown.Item><NavLink className="dropdown-item" to="/profile">Профил</NavLink></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><NavLink className="dropdown-item" to="/personal-products">Обяви</NavLink></NavDropdown.Item>
                            <NavDropdown.Item><NavLink className="dropdown-item" to="/messages">Съобщения</NavLink></NavDropdown.Item>
                            <NavDropdown.Item><NavLink className="dropdown-item" to="/favourites">Любими</NavLink></NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item><NavLink className="dropdown-item" to="/logout">Изход</NavLink></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;