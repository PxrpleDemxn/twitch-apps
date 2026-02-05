import { useState, useMemo } from "react";
import { useAuth } from "../context/UserContext";
import {
  Box,
  Button,
  Dialog,
  Flex,
  Text,
  Spinner,
  Badge,
} from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

const Profile = () => {
  const { user, loading } = useAuth();
  const [coinsHistory, setCoinsHistory] = useState(null);
  const [fetching, setFetching] = useState(false);

  const days = useMemo(() => {
    if (!user?.createdAt) return [];
    const dates = [];
    const start = new Date(user.createdAt);
    const today = new Date();
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    let runner = new Date(start);
    while (runner <= today) {
      dates.push(runner.toLocaleDateString("sv-SE"));
      runner.setDate(runner.getDate() + 1);
    }
    return dates.reverse();
  }, [user?.createdAt]);

  const fetchCurrencyHistory = async (date) => {
    setFetching(true);
    setCoinsHistory(null);
    try {
      const token = localStorage.getItem("token");
      const url = `${import.meta.env.VITE_API_URL}coinsHistory/list?date=${date}&twitchId=${user.twitchId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setCoinsHistory(data);
    } catch (error) {
      console.error("Error fetching currency history:", error);
    } finally {
      setFetching(false);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (!user) return <Text>No user data available.</Text>;

  return (
    <Box p="4">
      {/* User Info Header */}
      <Flex gap="4" align="center" mb="6">
        <img
          src={user.profileImageUrl}
          alt="avatar"
          style={{
            height: "80px",
            width: "80px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <Box>
          <Text as="div" size="5" weight="bold">
            {user.username}
          </Text>
          <Flex gap="3">
            <Text size="2" color="gray">
              Coins: <strong>{user.coins}</strong>
            </Text>
            <Text size="2" color="gray">
              Watch Time: <strong>{user.watchTime}m</strong>
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Box maxWidth="500px">
        <Text as="div" mb="3" size="3" weight="bold">
          Activity History
        </Text>
        <Flex direction="column" gap="1">
          {days.map((date) => (
            <Flex
              key={date}
              justify="between"
              align="center"
              p="2"
              style={{
                borderRadius: "6px",
                borderBottom: "1px solid var(--gray-4)",
              }}
            >
              <Text size="2" weight="medium">
                {date}
              </Text>
              <Dialog.Root>
                <Dialog.Trigger>
                  <Button
                    variant="ghost"
                    onClick={() => fetchCurrencyHistory(date)}
                  >
                    <MagnifyingGlassIcon />
                    Details
                  </Button>
                </Dialog.Trigger>

                <Dialog.Content maxWidth="450px">
                  <Dialog.Title>History - {date}</Dialog.Title>

                  <Box mt="4">
                    {fetching ? (
                      <Flex justify="center" p="4">
                        <Spinner />
                      </Flex>
                    ) : coinsHistory && coinsHistory.length > 0 ? (
                      <Flex direction="column" gap="2">
                        {coinsHistory.map((entry, index) => (
                          <Flex
                            key={index}
                            justify="between"
                            align="center"
                            p="3"
                            style={{
                              background: "var(--gray-2)",
                              borderRadius: "8px",
                            }}
                          >
                            <Box>
                              <Text as="div" size="2" weight="bold">
                                {entry.reason}
                              </Text>
                              <Text as="div" size="1" color="gray">
                                {new Date(entry.date).toLocaleTimeString(
                                  "cs-CZ",
                                  { hour: "2-digit", minute: "2-digit" },
                                )}
                              </Text>
                            </Box>
                            <Badge
                              color={entry.amount >= 0 ? "green" : "red"}
                              variant="soft"
                              size="2"
                            >
                              {entry.amount >= 0
                                ? `+${entry.amount}`
                                : entry.amount}
                            </Badge>
                          </Flex>
                        ))}
                      </Flex>
                    ) : (
                      <Flex justify="center" p="4">
                        <Text color="gray" size="2">
                          No transactions recorded for this day.
                        </Text>
                      </Flex>
                    )}
                  </Box>

                  <Flex gap="3" mt="5" justify="end">
                    <Dialog.Close>
                      <Button variant="soft" color="gray">
                        Close
                      </Button>
                    </Dialog.Close>
                  </Flex>
                </Dialog.Content>
              </Dialog.Root>
            </Flex>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Profile;
