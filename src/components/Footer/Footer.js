import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <h5>
        &copy; {new Date().getFullYear()}
        <span> The Apostolic Church </span>
      </h5>
      <h5>All rights reserved</h5>
    </Container>
  );
};

const Container = styled.footer`
  height: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: var(--clr-black);
  text-align: center;
  span {
    color: var(--clr-primary-5);
  }
  h5 {
    color: var(--clr-white);
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }

  /* Position the footer at the bottom */
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
`;

export default Footer;
