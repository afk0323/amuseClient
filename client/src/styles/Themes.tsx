import { createGlobalStyle } from "styled-components";

const Themes = createGlobalStyle`
  * {
    letter-spacing: -0.003em;
  }
  body {
    margin: 0;
    padding: 0;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  button {
    margin: 0;
    padding: 0;
    border: none;
    outline: none;
    background-color: transparent;
    cursor: pointer;
  }
  input {
    border: none;
    outline: none;
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  p, h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`;

export default Themes;
