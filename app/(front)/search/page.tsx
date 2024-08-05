"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Spinner from './Spinner';
import useSWR from 'swr';
import Users from '@/components/FrontEnd/Users';
import { Inforload } from '@/components/ui/InforLoad';

const fetchUsers = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to fetch users');
  }

  return response.json();
};

const SearchContent = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || '');

  const { data, error, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchUsers,
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);

  if (!encodedSearchQuery) {
    router.push('/');
  }

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <Inforload/>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Toaster />
      <Users users={data.users} />
    </>
  );
};

const SearchPage = () => {
  return (
    <Suspense fallback={<div className='w-screen h-screen flex justify-center items-center'><Spinner /></div>}>
      <SearchContent />
    </Suspense>
  );
};

export default SearchPage;
