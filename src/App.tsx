// App.tsx
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ItemList from "./ItemList";

// Create a client
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <ItemList />
      </div>
    </QueryClientProvider>
  );
};

export default App;
