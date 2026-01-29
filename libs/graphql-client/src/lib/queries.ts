import { gql } from '@urql/core';

// Get all Star Wars characters with basic info
export const GET_ALL_PEOPLE = gql`
  query GetAllPeople {
    allPeople {
      people {
        id
        name
        gender
        homeworld {
          name
        }
      }
    }
  }
`;

// Get a specific character by ID
export const GET_PERSON_BY_ID = gql`
  query GetPersonById($id: ID!) {
    person(id: $id) {
      id
      name
      gender
      height
      mass
      hairColor
      skinColor
      eyeColor
      birthYear
      homeworld {
        name
      }
      species {
        name
      }
    }
  }
`;

// Get random characters for game avatars
export const GET_RANDOM_CHARACTERS = gql`
  query GetRandomCharacters {
    allPeople(first: 10) {
      people {
        id
        name
        gender
        homeworld {
          name
        }
      }
    }
  }
`;