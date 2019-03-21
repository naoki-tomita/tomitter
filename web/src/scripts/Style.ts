import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Bree Serif', 'Kosugi Maru', sans-serif;
    button, input, select, textarea {
      font-family : inherit;
      font-size   : 100%;
    }
  }
`;
