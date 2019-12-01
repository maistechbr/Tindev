import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(-180deg, #22202c, #402845);
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;

    img {
      margin-bottom: 30px;
    }

    label {
      color: #fff;
      font-size: 16px;
      align-self: flex-start;
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin-bottom: 10px;
      border-radius: 4px;
      margin: 0 0 10px;
      transition: box-shadow 0.2s;

      &:focus {
        box-shadow: 0 0 3px rgba(93, 97, 164, 0.35);
      }

      &:hover {
        box-shadow: 0 0 3px rgba(93, 97, 164, 0.8);
      }

      &::placeholder {
        color: rgba(255, 255, 255, 0.7);
      }
    }

    span {
      color: #f94d6a;
      align-self: stretch;
      margin: 0 0 10px;
      font-weight: bold;
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #f94d6a;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.03, '#f94d6a')};
      }
    }

    a {
      color: #fff;
      margin-top: 15px;
      font-size: 16px;
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  }
`;
