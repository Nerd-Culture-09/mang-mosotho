import * as Dialog from "@radix-ui/react-dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export default function Terms (){
  return (
    <Dialog.Root>
      <Dialog.Trigger className="mx-auto py-2 ml-2 shadow-sm">
        Accept Terms & Conditions
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
          <div className="bg-white dark:bg-black rounded-md shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-50 ">
                Terms and conditions
              </Dialog.Title>
              <Dialog.Close className="p-2 text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[11.5px] leading-relaxed text-gray-950 dark:text-gray-50 dark:bg-black">
            <ScrollArea className="h-80 w-100">
                    <div className="p-4">
                    Effective Date: August 1, 2024

                    Welcome to MangMosotho.com ("we," "us," "our"). By accessing or using our digital phone book website (the "Site"), you agree to be bound by the following terms and conditions ("Terms"). Please read them carefully.

                    1. Acceptance of Terms

                    By registering on the Site, you agree to these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use the Site.

                    2. Registration and Profile

                    2.1 Eligibility: You must be at least 18 years old to use the Site. By registering, you represent and warrant that you meet this age requirement.

                    2.2 Account Information: When you register, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

                    2.3 Public vs. Private Listings: During registration, you can choose to make your profile and phone number either public or private. By default, your profile and phone number will be set to private unless you specifically choose to make them public.

                    3. Use of Information

                    3.1 Public Information: If you select the option to make your profile and phone number public, you agree that your information may be visible to other users of the Site and accessible via search.

                    3.2 Private Information: If you choose to keep your profile and phone number private, your information will not be visible to other users or searchable via the Site.

                    4. User Conduct

                    4.1 Prohibited Activities: You agree not to engage in any activity that may interfere with or disrupt the Site or its servers. This includes, but is not limited to, attempting to gain unauthorized access to the Site or its related systems.

                    4.2 Compliance: You agree to comply with all applicable laws and regulations while using the Site.

                    5. Privacy

                    Your use of the Site is also governed by our Privacy Policy. Please review it to understand how we collect, use, and share your information.

                    6. Intellectual Property

                    All content on the Site, including but not limited to text, graphics, logos, and software, is the property of MangMosotho.com or its licensors and is protected by copyright and other intellectual property laws.

                    7. Limitation of Liability

                    To the fullest extent permitted by law, MangMosotho.com will not be liable for any indirect, incidental, consequential, or punitive damages arising from or related to your use of the Site.

                    8. Changes to Terms

                    We reserve the right to update or modify these Terms at any time. Changes will be effective immediately upon posting on the Site. Your continued use of the Site after any changes indicates your acceptance of the new Terms.

                    9. Termination

                    We may suspend or terminate your account and access to the Site at any time if we believe you have violated these Terms.

                    10. Governing Law

                    These Terms are governed by and construed in accordance with the laws of Lesotho, without regard to its conflict of law principles.

                    11. Contact Us

                    If you have any questions about these Terms, please contact us at +266 59749725.
                    </div>
            </ScrollArea>
            </Dialog.Description>
            <div className="flex items-center gap-3 p-4 border-t">
              <Dialog.Close asChild>
                <Button className="px-6 py-2">
                  Close
                </Button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
