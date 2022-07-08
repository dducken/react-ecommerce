import { css } from "styled-components";

export const mobile = (props) => {
  return css`
    @media only screen and (max-width: 380px) {
      ${props}
    }
  `;
};

// Agregar mas dispositivos
// export const tablet = (props) => {
//     return css`
//       @media only screen and (max-width: 580px) {
//         ${props}
//       }
//     `;
//   };