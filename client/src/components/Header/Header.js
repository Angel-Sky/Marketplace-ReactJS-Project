import { Navbar, NavDropdown, Nav, Card, CardDeck, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillPersonFill, BsFillGridFill, BsFillHeartFill, BsFillEnvelopeFill, BsFillPlusCircleFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5'

import './Header.css'
function Header() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <div className="container">
                <Navbar.Brand>
                    <NavLink className="navbar-brand" to="/">All for you...</NavLink>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        {/* <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                    </Nav>
                    <Nav>
                        <NavLink className="nav-item" id="addButton" to="/add-product">
                            <BsFillPlusCircleFill />Add product
                        </NavLink>

                        <NavDropdown title="My Profile" id="collasible-nav-dropdown">
                            <NavLink className="dropdown-item" to="/profile">
                                <BsFillPersonFill />Profile
                            </NavLink>

                            <NavDropdown.Divider />

                            <NavLink className="dropdown-item" to="/sells">
                                <BsFillGridFill />Sells
                            </NavLink>
                            <NavLink className="dropdown-item" to="/messages">
                                <BsFillEnvelopeFill />Messages
                            </NavLink>
                            <NavLink className="dropdown-item" to="/favourites">
                                <BsFillHeartFill />Favourites
                            </NavLink>

                            <NavDropdown.Divider />

                            <NavLink className="dropdown-item" to="/auth/logout">
                                <IoLogOut />Log out
                            </NavLink>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;