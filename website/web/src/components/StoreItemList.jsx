import { useItems } from "./StoreItemProvider";
import { useAuth } from "./context/UserContext";
import { AlertDialog, Flex, Button } from "@radix-ui/themes";

const StoreItemList = () => {
  const { storeItems: items, isLoading } = useItems();
  const { user, setUser, loading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const onPurchase = async (item) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}purchase/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ twitchId: user.twitchId, itemId: item._id }),
        },
      );

      const data = await response.json();
      setUser((prev) => ({
        ...prev,
        coins: prev.coins - item.price,
        storePurchaseList: [
          ...prev.storePurchaseList,
          {
            purchaseId: data._id,
            itemId: item._id,
            date: data.purchaseDate,
          },
        ],
        coinsHistory: [
          ...prev.coinsHistory,
          {
            amount: -item.price,
            reason: `${item.name}`,
            date: new Date(),
          },
        ],
      }));
    } catch (error) {
      console.error("Error making purchase:", error);
    }
  };

  return (
    <>
      {!user ? (
        <div>Please log in to make purchases.</div>
      ) : (
        <div className="store-item-list">
          {items.map((item) => (
            <div key={item._id} className="store-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: {item.price} coins</p>
              <AlertDialog.Root>
                <AlertDialog.Trigger>
                  <Button color="cyan">Purchase</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                  <AlertDialog.Title>Purchase {item.name}</AlertDialog.Title>
                  <AlertDialog.Description size="2">
                    Are you sure you want to purchase {item.name} for{" "}
                    {item.price} coins?
                  </AlertDialog.Description>

                  <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                      <Button variant="soft" color="gray">
                        Cancel
                      </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                      <Button
                        variant="solid"
                        color="green"
                        onClick={() => onPurchase(item)}
                      >
                        Purchase
                      </Button>
                    </AlertDialog.Action>
                  </Flex>
                </AlertDialog.Content>
              </AlertDialog.Root>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default StoreItemList;
