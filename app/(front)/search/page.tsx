"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Spinner from "./Spinner";
import useSWR from "swr";
import { User } from "@prisma/client";

const fetchUsers = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR(
    `/actions/search?q=${encodedSearchQuery}`,
    fetchUsers,
    { revalidateOnFocus: false }
  );

  if (!encodedSearchQuery) {
    router.push("/");
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
        Showing results for:{" "}
        <span className="font-semibold">{searchQuery}</span>
      </span>
      <div>
        {data.users.map((user : User) => (
          <div key={user.email} className="user-card">
            <h2>{user.name}</h2>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchPage;
