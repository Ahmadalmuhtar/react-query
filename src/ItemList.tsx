import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { addItem, fetchAll, Item } from "./api";

const ItemList: React.FC = () => {
  const [newItem, setNewItem] = useState<Item>({ age: 0, name: "" });
  const queryClinet = useQueryClient();
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<Item[]>({
    queryKey: ["items"],
    queryFn: fetchAll,
  });

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      queryClinet.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const handleAddItem = () => {
    const itemToAdd: Omit<Item, "id"> = {
      name: newItem.name,
      age: newItem.age,
    };
    addItemMutation.mutate(itemToAdd);
    setNewItem({ name: "", age: 0 });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <head>Error: {(error as Error).message}</head>;
  return (
    <>
      <div>
        {users &&
          users.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
              <p>{user.age}</p>
            </div>
          ))}
      </div>
      <div>
        <input
          type="text"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="number"
          value={newItem.age}
          onChange={(e) =>
            setNewItem({ ...newItem, age: Number(e.target.value) })
          }
          placeholder="Age"
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>
    </>
  );
};

export default ItemList;
