import styled from "styled-components";
import { Link } from "react-router-dom";

export const Container = styled.header`
  background: #191920;

  .main {
    max-width: 1020px;
    margin: 0 auto;
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      transition: opacity 0.2s;

      &:hover {
        opacity: 0.7;
      }
    }
  }
`;

export const Cart = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #fff;
    }

    span {
      font-size: 12px;
      color: #999;
    }
  }
`;
