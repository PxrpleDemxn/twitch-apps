import React from "react";
import StoreItemList from "../StoreItemList";
import StoreItemProvider from "../StoreItemProvider";

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
