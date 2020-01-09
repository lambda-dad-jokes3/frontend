import React from "react";
import { Nav, NavItem} from "reactstrap";
import {Link} from "react-router-dom";

const Navigation = () => {
    return (
    <div>
        <Nav className="App">
            <h1>Dad Jokes</h1>
            <NavItem>
                <Link className="Nav-link" to="/">
                Home
                </Link>
            </NavItem>
            <NavItem>
                <Link className="Nav-link" to="/login">
                    Login
                </Link>
            </NavItem>
            <NavItem>
                <Link className="Nav-link" to="/signup">
                    Sign Up
                </Link>
            </NavItem>
            <NavItem>
                <Link className="Nav-link" to="/jokes">
                    Jokes
                </Link>
            </NavItem>
        </Nav>
    </div>
    );
};

export default Navigation;