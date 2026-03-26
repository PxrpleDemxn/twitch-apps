import { createContext, useContext, useState, useEffect } from "react";

export const StoreItemContext = createContext();

const StoreItemProvider = ({ children }) => {
  const [storeItems, setStoreItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStoreItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}item/list`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        setStoreItems(data);
      } catch (error) {
        console.error("Error fetching store items:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStoreItems();
  }, []);

  return (
    <StoreItemContext.Provider value={{ storeItems, isLoading }}>
      {children}
    </StoreItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(StoreItemContext);
  if (!context) {
    throw new Error("useItems must be used within a StoreItemProvider");
  }
  return context;
};

export default StoreItemProvider;
