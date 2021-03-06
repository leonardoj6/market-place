/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateMarket = /* GraphQL */ `
  subscription OnCreateMarket {
    onCreateMarket {
      id
      name
      tags
      owner
      createdAt
      products {
        items {
          id
          name
          description
          price
          shipped
          owner
          createdAt
          marketID
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onUpdateMarket = /* GraphQL */ `
  subscription OnUpdateMarket {
    onUpdateMarket {
      id
      name
      tags
      owner
      createdAt
      products {
        items {
          id
          name
          description
          price
          shipped
          owner
          createdAt
          marketID
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onDeleteMarket = /* GraphQL */ `
  subscription OnDeleteMarket {
    onDeleteMarket {
      id
      name
      tags
      owner
      createdAt
      products {
        items {
          id
          name
          description
          price
          shipped
          owner
          createdAt
          marketID
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const onCreateProduct = /* GraphQL */ `
  subscription OnCreateProduct {
    onCreateProduct {
      id
      name
      description
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
      marketID
      market {
        id
        name
        tags
        owner
        createdAt
        products {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onUpdateProduct = /* GraphQL */ `
  subscription OnUpdateProduct {
    onUpdateProduct {
      id
      name
      description
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
      marketID
      market {
        id
        name
        tags
        owner
        createdAt
        products {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
export const onDeleteProduct = /* GraphQL */ `
  subscription OnDeleteProduct {
    onDeleteProduct {
      id
      name
      description
      file {
        bucket
        region
        key
      }
      price
      shipped
      owner
      createdAt
      marketID
      market {
        id
        name
        tags
        owner
        createdAt
        products {
          nextToken
        }
        updatedAt
      }
      updatedAt
    }
  }
`;
