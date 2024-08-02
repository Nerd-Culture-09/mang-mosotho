"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract initial query parameter on mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const query = queryParams.get("q");
    if (query) {
      setSearchQuery(query);
    }
  }, []);

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();
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
