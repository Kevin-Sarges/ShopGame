import styled from "styled-components";

export const Container = styled.div`
  max-width: 1020px;
  margin: 0 auto;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
  list-style: none;

  li {
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;

    img {
      align-self: center;
      max-width: 250px;
    }

    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }

    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }

    button {
      margin-top: auto;
      display: flex;
      align-items: center;
      background: #191920;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      transition: background-color 0.2s;

      &:hover {
        background-color: #3284ff;
      }

      div {
        display: flex;
        align-items: center;
        padding: 12px;
        background: rgba(0, 0, 0, 0.1);
        border-right: 1px solid #3284ff;

        svg {
          margin-right: 5px;
        }
      }

      span {
        flex: 1;
        text-align: center;
        font-weight: bold;
      }
    }
  }
`;
