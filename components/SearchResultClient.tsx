"use client";

import { PostInfo } from "@/lib/data";
import { useEffect, useState } from "react";
import SearchResult from "@/components/SearchResult";
import useHash from "@/hooks/useHash";

interface SearchResultProps {
  posts?: PostInfo[];
  keywords?: string[];
  defaultSelectKeywords?: string[];
}
export default function SearchResultClient({
  posts = [],
  keywords = [],
  defaultSelectKeywords = [],
}: SearchResultProps) {
  const [selected, setSelected] = useState(defaultSelectKeywords);

  useEffect(() => {
    setSelected(defaultSelectKeywords);
  }, [defaultSelectKeywords.join(",")]);

  useHash((hash: string) => {
    const hashReg = /#([a-z]+)-(.*)/g.exec(hash);
    if (!hashReg) {
      return;
    }

    const [_, command, keyword] = hashReg;

    if (!keywords.includes(keyword)) {
      return;
    }

    setSelected((prev) => {
      const next = prev.filter((item) => item !== keyword);
      return command === "add" ? [...next, keyword] : next;
    });
  });

  return (
    <SearchResult
      className="mb-6 p-4 border-2 border-black"
      keywords={keywords}
      selectedKeywords={selected}
      posts={posts}
    />
  );
}
