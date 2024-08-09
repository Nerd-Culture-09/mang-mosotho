"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import TextInput from "../FormInputs/TextInput";
import { RegisterInputProps } from "@/types/types";
import { createUser } from "@/actions/users";
import SubmitButton from "../FormInputs/SubmitButton";

export default function RegisterFormWithSteps({
  role = "USER",
}: {
  role?: string | string[] | undefined;
}) {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<RegisterInputProps>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    facebookProfile: "",
    twitterProfile: "",
    linkedProfile: "",
    instaProfile: "",
    role: role as string,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    reset,
  } = useForm<RegisterInputProps>();

  const router = useRouter();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit: SubmitHandler<RegisterInputProps> = async () => {
    setIsLoading(true);
    try {
      const user = await createUser(formData);
      if (user && user.status === 200) {
        reset();
        setIsLoading(false);
        toast.success("User created successfully");
        router.push(`/login`);
      } else {
        console.error(user.error);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleNextStep = async () => {
    const isStepOneValid = await trigger([
      "fullName",
      "email",
      "phone",
      "location",
      "password",
    ]);

    if (isStepOneValid) {
      setStep(2);
    }
  };

  return (
    <>
      {step === 1 ? (
        <div className="w-full flex items-center justify-center h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Sign Up</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your information to create an account
                </p>
              </div>
              <form className="grid gap-4">
                <TextInput
                  label="Full Name"
                  register={register}
                  name="fullName"
                  errors={errors}
                  placeholder="Eg. Tankiso Fuma"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />

                <TextInput
                  label="Email Address"
                  register={register}
                  name="email"
                  type="email"
                  errors={errors}
                  placeholder="Eg. mangmosotho@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <TextInput
                  label="Phone Number"
                  register={register}
                  name="phone"
                  type="tel"
                  errors={errors}
                  placeholder="Eg. +266 57897856"
                  value={formData.phone}
                  onChange={handleInputChange}
                />

                <TextInput
                  label="Location"
                  register={register}
                  name="location"
                  errors={errors}
                  placeholder="Eg. Khubetsoana"
                  value={formData.location}
                  onChange={handleInputChange}
                />

                <TextInput
                  label="Password"
                  register={register}
                  name="password"
                  type="password"
                  errors={errors}
                  placeholder="**********"
                  value={formData.password}
                  onChange={handleInputChange}
                />

                <Button type="button" onClick={handleNextStep}>
                  Next
                </Button>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center h-screen lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Additional Information</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your social media usernames (optional)
                </p>
              </div>
              <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
                <TextInput
                  label="Facebook Profile"
                  register={register}
                  name="facebookProfile"
                  errors={errors}
                  isRequired={false}
                  placeholder="https://facebook.com/yourprofile"
                  value={formData.facebookProfile}
                  onChange={handleInputChange}
                />

                <TextInput
                  label="Twitter Profile"
                  register={register}
                  name="twitterProfile"
                  errors={errors}
                  isRequired={false}
                  placeholder="https://twitter.com/yourprofile"
                  value={formData.twitterProfile}
                  onChange={handleInputChange}
                />

                <TextInput
                  label="LinkedIn Profile"
                  register={register}
                  name="linkedProfile"
                  errors={errors}
                  isRequired={false}
                  placeholder="https://linkedin.com/yourprofile"
                  value={formData.linkedProfile}
                  onChange={handleInputChange}
                />

                <TextInput
                  label="Instagram Profile"
                  register={register}
                  name="instaProfile"
                  errors={errors}
                  isRequired={false}
                  placeholder="https://instagram.com/yourprofile"
                  value={formData.instaProfile}
                  onChange={handleInputChange}
                />

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <Link href="/conditions">
                    <Label htmlFor="terms" className="cursor-pointer">
                      Accept terms and conditions
                    </Label>
                  </Link>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => setStep(1)}
                  >
                    Previous
                  </Button>
                  <SubmitButton
                  title="Complete Registration"
                  isLoading={isLoading}
                  LoadingTitle="Creating Account, please wait...."
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}