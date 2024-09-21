/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar,
  Container,
  Nav,
  // Button,
  Image,
  Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';

export default function NavBar() {
  const { user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="custom-navbar">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>
            <Image src="/RARE_PUBLISHING-logo.png" layout="fill" alt="Rare Logo" style={{ width: '140px', height: '60px' }} />
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Link passHref href="/">
              <Nav.Link className="nav-link">Home</Nav.Link>
            </Link>
            <Link passHref href={`/users/${user.id}`}>
              <Nav.Link className="nav-link">Profile</Nav.Link>
            </Link>
            <Link passHref href="/posts/all">
              <Nav.Link className="nav-link">Discover</Nav.Link>
            </Link>
            <Link passHref href="/categories">
              <Nav.Link className="nav-link">Category Manager</Nav.Link>
            </Link>
            <Link passHref href="/tags">
              <Nav.Link className="nav-link">Tag Manager</Nav.Link>
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
