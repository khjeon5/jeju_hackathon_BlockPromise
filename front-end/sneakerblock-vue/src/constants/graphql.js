import gql from 'graphql-tag'

const SIGNUP = gql`
  mutation signup($email: String!, $password: String!, $name: String!, $homeAddress: String!, $klayAddress: String!, $klayPrivateKey: String!) {
    signUp(input: { email: $email, password: $password, name: $name, homeAddress: $homeAddress, klayAddress: $klayAddress, klayPrivateKey: $klayPrivateKey }) {
      name
    }
  }
`

const CREATE_USER_MUTATION = gql`
  mutation createUser($email: String!, $password: String!, $pubkey: String!, $name: String!, $address: String!) {
    createUser(input: { email: $email, password: $password, address: $address, name: $name, pubKey: $pubkey }) {
      _id
      email
      password
      address
      name
      pubKey
    }
  }
`
const GET_USER_QUERY = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      pubKey
      name
      address
    }
  }
`

export { CREATE_USER_MUTATION, GET_USER_QUERY, SIGNUP }
