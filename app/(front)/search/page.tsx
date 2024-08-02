"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Spinner from './Spinner';
import useSWR from 'swr';
import Users from '@/components/FrontEnd/Users';

const fetchUsers = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};

const SearchContent = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get('q') : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || '');

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchUsers,
    { revalidateOnFocus: false }
  );

  if (!encodedSearchQuery) {
    router.push('/');
  }

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex justify-center items-center'>
        <Spinner />
      </div>
    );
  }

  if (!data?.users) {
    return null;
  }

  return (
    <>
      <span className="text-xl font-bold flex py-3 text-blue-600 justify-center items-center">
        Mang?
      </span>
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
