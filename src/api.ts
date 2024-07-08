export interface Item {
  id?: number;
  name: string;
  age: number;
}

let data: Item[] = [
  { id: 1, name: "John Doe", age: 25 },
  { id: 2, name: "Jane Smith", age: 30 },
  { id: 3, name: "Bob Johnson", age: 45 },
];

export const fetchAll = async (): Promise<Item[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...data]);
    }, 500);
  });
};

export const fetchById = async (id: number): Promise<Item> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const item = data.find((d) => d.id === id);
      if (item) {
        resolve(item);
      } else {
        reject(new Error("Item not found"));
      }
    }, 500);
  });
};

export const addItem = async (newItem: Omit<Item, "id">): Promise<Item> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newId = data.length + 1;
      const itemWithId = { ...newItem, id: newId };
      data.push(itemWithId);
      resolve(itemWithId);
    }, 500);
  });
};

export const updateItem = async (
  id: number,
  updatedItem: Partial<Item>
): Promise<Item> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = data.findIndex((d) => d.id === id);
      if (index !== -1) {
        data[index] = { ...data[index], ...updatedItem };
        resolve(data[index]);
      } else {
        reject(new Error("Item not found"));
      }
    }, 500);
  });
};

export const deleteItem = async (id: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = data.findIndex((i) => i.id === id);
      if (index !== -1) {
        const deletedItem = data.splice(index, 1);
        resolve(deletedItem[0]);
      } else {
        reject(new Error("Item not found"));
      }
    }, 500);
  });
};
