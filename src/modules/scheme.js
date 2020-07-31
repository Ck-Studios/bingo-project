import gql from "graphql-tag";

export const LOAD_BINGO = gql`
  {
    allBingos {
      edges {
        node {
          id
          title
          thumbnail
          order
          text
          boardTheme {
            id
            size
            boardImage
            ringImage
          }
          bingoResults {
            id
            type
            text
            image
          }
        }
      }
    }
  }
`;

export const GET_MATCHED_BINGO = gql`
  query bingo($id: ID!) {
    bingo(id: $id) {
      id
      title
      thumbnail
      text
      boardTheme {
            id
            size
            boardImage
            ringImage
          }
          bingoResults {
            id
            type
            text
            image
          }
    }
  }
`;

export const LOAD_LOCAL_BINGO = gql`
    {
        allBingos @client {
            edges {
                node {
                    id
                    title
                    boardTheme {
                        id
                        size
                        boardImage
                        ringImage
                    }
                    bingoResults {
                        id
                        type
                        text
                        image
                    }
                }
            }
        }
    }
`;
