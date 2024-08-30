import { BriefcaseBusiness, Clipboard, Footprints, Globe, Share2, User2 } from "lucide-react";
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
import { Input } from "../ui/input";
import { MarketingCard } from "./MarketingCard";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";

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

interface Business {
    businessName: string;
    businessEmail: string;
    businessPhone: string;
    businessAddress: string;
    role: string;
    district: string;
    website: string;
    code: string;
}

interface UsersProps {
    users: User[];
    businesses: Business[];
}

const Users: React.FC<UsersProps> = ({ users, businesses }) => {
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
      value: "person",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-white dark:from-black to-white-900">
           <div className="flex justify-center items-center">
                {users.map((user) => (
                  <div key={user.email} className="flex flex-col justify-center items-center gap-5">
                  <div>
                  <Footprints className="text-black dark:text-white"/>
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
                      <Globe className="text-black dark:text-white"/>
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
    {
      title: "Business",
      value: "business",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-white dark:from-black to-white-900">
           <div className="flex justify-center items-center">
            <ScrollArea className="h-44 w-80">
            {businesses.length > 0 ? businesses.map((business) => (
                  <div key={business.businessEmail} className="flex flex-col justify-center items-center gap-5">
                    <div>
                      <BriefcaseBusiness className="text-black dark:text-white"/>
                    </div>
                    <div>
                      <Input value={business.businessName} className="w-[300px]" />
                      <Input value={business.businessEmail} className="w-[300px]" />
                      <Input value={business.businessPhone} className="w-[300px]" />
                      {business.district && <Input value={business.district} className="w-[300px]"/>}
                      {business.website && <Input value={business.website} className="w-[300px]"/>}
                      {business.businessAddress && <Textarea value={business.businessAddress} className="w-[300px]"/>}
                    </div>
                  </div>
                )) : ""}
            </ScrollArea>
           </div>
        </div>
      ),
    },
  ];

  return (
    <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative b flex flex-col max-w-5xl mx-auto w-full items-start justify-start my-10 p-5">
      <Tabs tabs={tabs} />
    </div>
  );
};

export default Users;
