import { gql, useQuery } from '@apollo/client';
import { GET_USERNAMES } from '../graphql/queries';


export function UsernamesList() {
  const { loading, error, data } = useQuery(GET_USERNAMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Extract usernames into an array of strings
  const usernames = data.getUsers.map(user => user.username);

  return (
    <div>
      <h3>Usernames</h3>
      <ul>
        {usernames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
    </div>
  );
}
