"use client";

import { useRouter, useSearchParams } from 'next/navigation';
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

const SearchPage = () => {
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
    return <Spinner />;
  }

  if (!data?.users) {
    return null;
  }

  return (
    <>
      <span className="text-xl">
        Showing results for: <span className="font-semibold">{searchQuery}</span>
      </span>
      <Users users={data.users} />
    </>
  );
};

export default SearchPage;
