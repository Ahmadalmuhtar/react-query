import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Post {
  id: number;
  title: string;
  body?: string;
  userId: number;
}

const FetchComponent: React.FC = () => {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const addPost = async (newPost: Partial<Post>): Promise<Post> => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error("Failed to add post");
    }

    return response.json();
  };

  async function FetchData(query = ""): Promise<Post[]> {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  }

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryFn: FetchData(search),
    queryKey: ["posts", { search }],
  });

  const { mutateAsync: addPostMutation } = useMutation({
    mutationFn: addPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      console.log("Error");
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  return (
    <>
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <button
          onClick={async () => {
            try {
              await addPostMutation({ title });
              setTitle("");
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Add Post
        </button>
      </div>
      <ul>
        {posts?.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
};

export default FetchComponent;
