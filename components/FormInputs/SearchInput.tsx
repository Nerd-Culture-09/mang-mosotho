"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useSession, signIn } from "next-auth/react";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

const SearchInput = () => {
  const placeholders = [
    "Search by name to find their phone number or email",
    "Search by phone number to find their name or email",
    "Search by email to find their name or phone number",
    "Enter a name to retrieve the corresponding contact details",
    "Enter a phone number to get the associated name or email",
    "Enter an email address to find the linked name and phone number"
  ];

  const [searchQuery, setSearchQuery] = useState<string>("");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (status === "unauthenticated") {
      signIn(); // Redirect to the sign-in page
      return;
    }
    if (searchQuery) {
      const encodedSearchQuery = encodeURI(searchQuery);
      router.push(`/search?q=${encodedSearchQuery}`);
    }
  };

  return (
    <PlaceholdersAndVanishInput
      placeholders={placeholders}
      onChange={(event) => setSearchQuery(event.target.value)}
      onSubmit={onSearch}
    />
  );
};

export default SearchInput;
