import { PostInfo } from "@/lib/data";
import Keywords from "@/components/Keywords";
import List from "@/components/List";
import { ChildrenProps, ClassNameProps } from "@/types/props";
import { useMemo } from "react";
import { filteredPostsFromTags } from "@/lib/filter";

interface SearchResultProps extends ChildrenProps, ClassNameProps {
  posts?: PostInfo[];
  keywords?: string[];
  selectedKeywords?: string[];
  isOnlyAdd?: boolean;
  isAndMode?: boolean;
}
export default function SearchResult({
  children,
  className,
  posts = [],
  keywords = [],
  selectedKeywords = [],
  isOnlyAdd = false,
  isAndMode = false,
}: SearchResultProps) {
  const filteredPosts = useMemo(
    () => filteredPostsFromTags(posts, selectedKeywords, isAndMode),
    [posts, isAndMode, selectedKeywords],
  );

  return (
    <div>
      <Keywords
        className={className}
        keywords={keywords}
        selected={selectedKeywords}
        isOnlyAdd={isOnlyAdd}
      >
        {filteredPosts.length > 0
          ? children
          : "태그와 관련된 게시글이 없습니다."}
      </Keywords>
      <List posts={filteredPosts} />
    </div>
  );
}
