// components/FrontEnd/Users.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSearchParams } from "next/navigation";


interface User {
    name: string;
    email: string;
    phone: string;
    location: string;
  }
  
  interface UsersProps {
    users: User[];
  }
  
  const Users: React.FC<UsersProps> = ({ users }) => {
    return (
      <div className="flex justify-center items-center">
      <Card className="w-[850px] mt-10 shadow-xl border border-green-500">
      <CardHeader>
        <CardTitle className="text-green-500">
          Mang?
        </CardTitle>
      </CardHeader>
      <CardContent>
        {users.map((user) => (
          <div key={user.email} >
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Location: {user.location}</p>
          </div>
        ))}
      </CardContent>
    </Card>
      </div>
    );
  };
  
  export default Users;

