// components/FrontEnd/Users.tsx

import { User2 } from "lucide-react";
import { Card } from "../ui/card";

import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

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
        <Card className="p-5 w-[50%]">
            {users.map((user) => (
              <div key={user.email} >
                <p><span className="font-semibold text-xl"><User2 />{" "}{user.name}</span></p>
                <p><span className="font-semibold text-xl">Email:</span>{" "}{user.email}</p>
                <p><span className="font-semibold text-xl">Number:</span>{" "}{user.phone}</p>  
                <p><span className="font-semibold text-xl">Location:</span>{" "}{user.location}</p>
              </div>
            ))}
        </Card>
      </div>
    );
  };

  
  
  export default Users;

