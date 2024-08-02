// components/FrontEnd/Users.tsx

import { User2 } from "lucide-react";
import { Card } from '@tremor/react';
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import Image from "next/image";  
import { Tabs } from "../ui/tabsacer";

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
    const tabs = [
      {
        title: "Person",
        value: "product",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
             <div className="flex justify-center items-center">
                  {users.map((user) => (
                    <div key={user.email} >
                      <p><span className="font-semibold text-xl"><User2 />{" "}{user.name}</span></p>
                      <p><span className="font-semibold text-xl">Email:</span>{" "}{user.email}</p>
                      <p><span className="font-semibold text-xl">Number:</span>{" "}{user.phone}</p>  
                      <p><span className="font-semibold text-xl">Location:</span>{" "}{user.location}</p>
                    </div>
                  ))}
            </div>
          </div>
        ),
      },
   
      {
        title: "Details",
        value: "random",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
             <div className="flex justify-center items-center">
                  {users.map((user) => (
                    <div key={user.email} >
                      <p><span className="font-semibold text-xl"><User2 />{" "}{user.name}</span></p>
                      <p><span className="font-semibold text-xl">Email:</span>{" "}{user.email}</p>
                      <p><span className="font-semibold text-xl">Number:</span>{" "}{user.phone}</p>  
                      <p><span className="font-semibold text-xl">Location:</span>{" "}{user.location}</p>
                    </div>
                  ))}
            </div>
          </div>
        ),
      },
    ];
    
    return (
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full  items-start justify-start my-10 p-5">
        <Tabs tabs={tabs} />
      </div>
    );
  };

  
  
  export default Users;

  const DummyContent = () => {
    return (
      <Image
        src="/linear.webp"
        alt="dummy image"
        width="1000"
        height="1000"
        className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
      />
    );
  };