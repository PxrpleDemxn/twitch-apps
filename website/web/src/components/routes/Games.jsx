import GameCardList from "../rGames/GameCardList";
import { Flex } from "@radix-ui/themes";
import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

const Games = () => {
  const [gameList, setGameList] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}game/list`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        const data = await response.json();
        setGameList(data);
      } catch (error) {
        console.error("Failed to fetch games:", error);
      }
    };

    fetchGames();
  }, []);

  const [search, setSearch] = useState("");
  return (
    <>
      <Flex direction="column" align="center" gap="4" pt="10px">
        <TextField.Root
          placeholder="Hledat hru..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: "100%", maxWidth: "720px" }}
        >
          <TextField.Slot>
            <MagnifyingGlassIcon height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>

        <GameCardList
          gameList={gameList.filter((game) =>
            game.name.toLowerCase().includes(search.toLowerCase()),
          )}
        />
      </Flex>
    </>
  );
};
export default Games;
