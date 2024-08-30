import { authOptions } from '@/lib/auth'
import LoginFormWithBg from '@/components/Auth/Login'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation';
import React from 'react'

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <div className="">
      <LoginFormWithBg/> 
    </div>
  )
}
