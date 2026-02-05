import { useItems } from "./StoreItemProvider";
import { useAuth } from "../context/UserContext";
import {
  AlertDialog,
  Flex,
  Button,
  Grid,
  Card,
  Text,
  Box,
  Badge,
  Inset,
  Container,
} from "@radix-ui/themes";

const StoreItemList = () => {
  const { storeItems: items, isLoading } = useItems();
  const { user, setUser } = useAuth();

  if (isLoading) {
    return (
      <Flex justify="center" align="center" py="9">
        <Text size="5" color="gray">
          Loading items...
        </Text>
      </Flex>
    );
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
      }));
    } catch (error) {
      console.error("Error making purchase:", error);
    }
  };

  if (!user) {
    return (
      <Container size="1">
        <Box p="4">
          <Card variant="surface">
            <Text align="center" as="p">
              Please log in to make purchases.
            </Text>
          </Card>
        </Box>
      </Container>
    );
  }

  return (
    <Box p="4">
      <Text size="6" weight="bold" mb="5" as="h2">
        Store
      </Text>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 280px))",
          gap: "16px",
          justifyContent: "start",
        }}
      >
        {items.map((item) => {
          const canAfford = user.coins >= item.price;

          return (
            <Card
              key={item._id}
              size="2"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Inset clip="padding-box" side="top" pb="current">
                <Box
                  style={{
                    background:
                      "linear-gradient(135deg, var(--blue-9), var(--indigo-9))",
                    height: "60px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text size="6">🎁</Text>
                </Box>
              </Inset>

              <Flex
                direction="column"
                gap="2"
                justify="between"
                style={{ flexGrow: 1 }}
              >
                <Box>
                  <Flex justify="between" align="start" mb="1" gap="2">
                    <Text size="2" weight="bold" style={{ lineHeight: "1.2" }}>
                      {item.name}
                    </Text>
                    <Badge
                      color="yellow"
                      variant="soft"
                      size="1"
                      style={{ flexShrink: 0 }}
                    >
                      {item.price}
                    </Badge>
                  </Flex>
                  <Text size="1" color="gray" style={{ minHeight: "32px" }}>
                    {item.description}
                  </Text>
                </Box>

                <Box mt="2">
                  <AlertDialog.Root>
                    <AlertDialog.Trigger>
                      <Button
                        color="cyan"
                        variant="soft"
                        size="2"
                        style={{ width: "100%" }}
                        disabled={!canAfford}
                      >
                        {canAfford ? "Purchase" : "No Coins"}
                      </Button>
                    </AlertDialog.Trigger>

                    <AlertDialog.Content maxWidth="400px">
                      <AlertDialog.Title>Confirm</AlertDialog.Title>
                      <AlertDialog.Description size="2">
                        Buy <Text weight="bold">{item.name}</Text> for{" "}
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
                            Confirm
                          </Button>
                        </AlertDialog.Action>
                      </Flex>
                    </AlertDialog.Content>
                  </AlertDialog.Root>
                </Box>
              </Flex>
            </Card>
          );
        })}
      </div>
    </Box>
  );
};

export default StoreItemList;
