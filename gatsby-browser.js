// custom typefaces
import { createGlobalStyle } from 'styled-components';

import "prismjs/plugins/line-highlight/prism-line-highlight.css"
import "prismjs/themes/prism-tomorrow.css"
import "typeface-montserrat"
import "typeface-open-sans"
import "typeface-merriweather"

export const GlobalStyle = createGlobalStyle`
     body {
      ::-webkit-scrollbar {
        width: .5em;
      }
      ::-webkit-scrollbar-track {
        background-color: #1e1e1e;
      }
      ::-webkit-scrollbar-thumb {
        background-color: indianred;
        border-radius: 10px;
      }
     }
  `