'use client';

import { Divider } from '@tremor/react';
import TextInput from '../FormInputs/TextInput';
import { useForm } from "react-hook-form";
import { BusinessRegisterInputProps } from '@/types/types';
import { useState } from 'react';
import SubmitButton from '../FormInputs/SubmitButton';
import Link from 'next/link';
import toast from 'react-hot-toast';
import router from 'next/router';
import { createBusinessProfile } from '@/actions/users';

export default function BusinessRegister({
    role="BUSINESS",
  }:{
    role?: string | string[] | undefined; // Role prop can be string or array of strings or undefined
  }) {
    const [isLoading, setIsLoading] = useState(false); // State for loading state
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors},
  } = useForm<BusinessRegisterInputProps>();

  async function onSubmit (data: BusinessRegisterInputProps) {
    setIsLoading(true); // Start loading
    data.role = role; // Assigning role from props to form data
    try {
      const business = await createBusinessProfile(data);
      if (business && business.status === 200) {
        console.log("Business Profile created successfully");
        reset(); // Reset form
        setIsLoading(false); // Stop loading
        toast.success("Business Profile created successfully"); // Success toast for user creation
        router.push("/");
        console.log(business.data);
      } else {
        console.log(business.error);
      }
    } catch (error) {
      console.log(error); // Log any errors
    }
  }
  return (
    <>
      <div className="sm:mx-auto sm:max-w-2xl py-10">
        <h3 className="text-tremor-title font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Register to workspace
        </h3>
        <p className="mt-1 text-tremor-default leading-6 text-tremor-content dark:text-dark-tremor-content">
          Take a few moments to register for your company's profile
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full sm:col-span-3">
              <TextInput
              label="Business Name"
              register={register}
              name="businessName"
              errors={errors}
              placeholder={"NucleusDevs"}
            />
            </div>
            <div className="col-span-full sm:col-span-3">
              <TextInput
              label="Business Phone Number"
              register={register}
              name="businessPhone"
              errors={errors}
              placeholder={"+@266 50154335"}
            />
            </div>
            <div className="col-span-full">
              <TextInput
              label="Business Email Address"
              register={register}
              name="businessEmail"
              errors={errors}
              placeholder={"nucleusdevs@gmail.com"}
            />
            </div>
            <div className="col-span-full">
              <TextInput
              label="Business Address"
              register={register}
              name="businessAddress"
              errors={errors}
              placeholder={"123 Kingsway Mall"}
            />
            </div>
            <div className="col-span-full sm:col-span-2">
              <TextInput
              label="District"
              register={register}
              name="district"
              errors={errors}
              placeholder={"Maseru"}
            />
            </div>
            <div className="col-span-full sm:col-span-2">
              <TextInput
              label="Business Website"
              register={register}
              name="website"
              errors={errors}
              placeholder={"nucleusdevs.com"}
            />
            </div>
            <div className="col-span-full sm:col-span-2">
              <TextInput
              label="Postal Code"
              register={register}
              name="code"
              errors={errors}
              placeholder={"100"}
            />
            </div>
          </div>
          <Divider />
          <div className="flex items-center justify-end space-x-4">
            <Link href="/">
            <button
              type="button"
              className="whitespace-nowrap rounded-tremor-small px-4 py-2.5 text-tremor-default font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong"
            >
              Cancel
            </button>
            </Link>
            <SubmitButton
              title="Sign Up"
              isLoading={isLoading}
              LoadingTitle="Creating Account, please wait...."
            />
          </div>
        </form>
      </div>
    </>
  );
}