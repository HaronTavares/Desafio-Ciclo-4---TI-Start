import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';

export const Menu = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar color="info" dark expand="md">
                <Container>
                    <Navbar>
                        <NavbarBrand href="/">TI Academy</NavbarBrand>
                        <NavbarToggler onClick={toggle} />
                        <Collapse isOpen={isOpen} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/">Home</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Navbar> {/*Conjuto <Navbar></Navbar> foi usado para manter 'TI Academy' e 'Home' na mesma linha.*/}
                </Container>
            </Navbar>
        </div>
    );
};