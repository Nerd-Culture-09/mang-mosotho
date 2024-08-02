// components/FrontEnd/Users.tsx

interface User {
    name: string;
    email: string;
    phone: string;
  }
  
  interface UsersProps {
    users: User[];
  }
  
  const Users: React.FC<UsersProps> = ({ users }) => {
    return (
      <div>
        {users.map((user) => (
          <div key={user.email} className="user-card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Users;
  