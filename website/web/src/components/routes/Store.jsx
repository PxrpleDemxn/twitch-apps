import React from "react";
import StoreItemList from "../storeComponents/StoreItemList";
import StoreItemProvider from "../storeComponents/StoreItemProvider";

const Store = () => {
  return (
    <div>
      <StoreItemProvider>
        <StoreItemList />
      </StoreItemProvider>
    </div>
  );
};
export default Store;
