/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBar() {
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
            <Link passHref href="/posts/all">
              <Nav.Link>Discover</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link>Category Manager</Nav.Link>
            </Link>
            <Link passHref href="/tags">
              <Nav.Link>Tag Manager</Nav.Link>
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
