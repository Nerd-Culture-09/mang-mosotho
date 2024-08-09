// components/FrontEnd/Users.tsx

import { Clipboard, Footprints, Share2, User2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from "next/image";  
import { Tabs } from "../ui/tabsacer";
import { useToast } from '@/components/ui/use-toast'
import { Card } from "../ui/card";
import {
  User,
} from "lucide-react"
 
import { Input } from "../ui/input";
import { MarketingCard }  from "./MarketingCard";
interface User {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedProfile: string;
    facebookProfile: string;
    twitterProfile: string;
    instaProfile: string;
  }
  
  interface UsersProps {
    users: User[];
  }
  
  const Users: React.FC<UsersProps> = ({ users }) => {
   const { toast } = useToast()
   
   function copyToClipboard(text: any) {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast({
          title: "Text copied to clipboard",
          description: text,
        })
      })
      .catch((error) => {
        toast({
          title: "Failed to copy link to clipboard",
          description: error,
        })
      });
  }
  
  const handleCopy = (text: string) => {
    copyToClipboard(text);
}
    const tabs = [
      {
        title: "Person",
        value: "product",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-white dark:from-black to-white-900">
             <div className="flex justify-center items-center">
                  {users.map((user) => (
                    <div key={user.email} className="flex flex-col justify-center items-center gap-5">
                      <div>
                        <User2 />
                      </div>
                      <Card className=" p-5 w-[300px] flex justify-between items-center border">
                        <div className="text-sm">
                          {user.name}
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                            <Clipboard onClick={() => handleCopy(user.name)} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Card>
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
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-white dark:from-black to-white-900">
             <div className="flex justify-center items-center">
                  {users.map((user) => (
                    <div key={user.email} className="flex flex-col justify-center items-center gap-5">
                    <div>
                    <Footprints />
                    </div>
                    <div>
                      <Input value={user.phone} className="w-[300px]"/>
                      <Input value={user.email} className="w-[300px]"/>
                      {user.location && <Input value={user.location} className="w-[300px]"/>}
                    </div>
                  </div>
                  ))}
            </div>
          </div>
        ),
      },
      {
        title: "Socials",
        value: "socials",
        content: (
          <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-white dark:from-black to-white-900">
            <MarketingCard />
             <div className="flex justify-center items-center">
                  {users.map((user) => (
                    <div key={user.email} className="flex flex-col justify-center items-center gap-5">
                      <div>
                        <User2 />
                      </div>
                      <Card className=" p-5 w-[300px] flex justify-between items-center border">
                        <div className="text-sm">
                          {user.name}
                          {user.linkedProfile}
                        </div>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                            <Clipboard onClick={() => handleCopy(user.name)} />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Copy</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </Card>
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