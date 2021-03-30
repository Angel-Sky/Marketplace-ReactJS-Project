import { useContext } from 'react';
import { Context } from '../../ContextStore';
import { Navbar, NavDropdown, Nav, Card, CardDeck, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { BsFillPersonFill, BsFillGridFill, BsFillHeartFill, BsFillEnvelopeFill, BsFillPlusCircleFill } from 'react-icons/bs';
import { IoLogOut } from 'react-icons/io5'

import './Header.css'
function Header() {
    const { userData, setUserData } = useContext(Context)

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
                    {userData ?
                        (<Nav>
                            <NavLink className="nav-item" id="addButton" to="/add-product">
                                <BsFillPlusCircleFill />Add product
                        </NavLink>

                            <NavDropdown title="My Profile" id="collasible-nav-dropdown">
                                <NavLink className="dropdown-item" to="/profile">
                                    <BsFillPersonFill />Profile
                            </NavLink>

                                <NavDropdown.Divider />

                                <NavLink className="dropdown-item" to="/your-sells">
                                    <BsFillGridFill />Sells
                            </NavLink>
                                <NavLink className="dropdown-item" to="/messages">
                                    <BsFillEnvelopeFill />Messages
                            </NavLink>
                                <NavLink className="dropdown-item" to="/favourites">
                                    <BsFillHeartFill />Favourites
                            </NavLink>

                                <NavDropdown.Divider />

                                <NavLink className="dropdown-item" to="/auth/logout" onClick={()=> {
                                    setUserData(null)
                                }}>
                                    <IoLogOut />Log out
                                </NavLink>
                            </NavDropdown>
                        </Nav>)
                    :
                    (<Nav>
                            <NavLink className="nav-item" id="nav-sign-in" to="/auth/login">
                                Sign In
                            </NavLink>
                            <NavLink className="nav-item" id="nav-sign-up" to="/auth/register">
                                Sign Up
                            </NavLink>
                        </Nav>)
                    }
                </Navbar.Collapse>
            </div>
        </Navbar>
    )
}

export default Header;