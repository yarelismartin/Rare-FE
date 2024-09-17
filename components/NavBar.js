/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, //
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>RARE</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link passHref href={`/users/${user.id}`}>
              <Nav.Link>Profile</Nav.Link>
            </Link>
            <Link passHref href="/posts/new">
              <button className="btn btn-outline btn-primary fw-400 publish-btn" type="button">Publish</button>
            </Link>
          </Nav>

        </Navbar.Collapse>
        <Button variant="danger" onClick={signOut}>
          Sign Out
        </Button>
      </Container>
    </Navbar>
  );
}
