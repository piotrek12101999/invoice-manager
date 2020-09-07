import { createGlobalStyle } from 'styled-components';
import { ThemeWithGlobal } from '../ui.models';

const GlobalStyles = createGlobalStyle<{ theme: ThemeWithGlobal }>`
  body {
    margin: 0;
    font-family: 'Roboto';
    background: ${(props) => props.theme.canvasColor};
    color: ${(props) => props.theme.textColor};
    font-family: ${(props) => props.theme.fontFamily};
  }

  *, *::before, *::after {
    transition: color, background ease-in-out .3s;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

export default GlobalStyles;
