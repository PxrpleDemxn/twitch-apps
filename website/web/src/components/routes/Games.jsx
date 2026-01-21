import GameCardList from "../rGames/GameCardList";
import { Flex } from "@radix-ui/themes";
import { TextField } from "@radix-ui/themes";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const gameList = [
  {
    id: 1,
    name: "Dying Light",
    rating: 4.5,
    comment: "Nice game!",
    timesFinished: 2,
    steamStoreUrl: null,
    artworkUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/239140/f287172af4c5358f923523fe94faa1bd9d0007c7/header.jpg?t=1763646303",
  },
  {
    id: 2,
    name: "Ninja Gaiden 4",
    rating: 4.0,
    comment: "Awesome!",
    timesFinished: 1,
    steamStoreUrl: "https://store.steampowered.com/app/2627260/NINJA_GAIDEN_4/",
    artworkUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2627260/header.jpg?t=1762366827",
  },
  {
    id: 3,
    name: "Cyberpunk 2077",
    rating: 5.0,
    comment: "Great game!",
    timesFinished: 3,
    steamStoreUrl: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
    artworkUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/e9047d8ec47ae3d94bb8b464fb0fc9e9972b4ac7/header.jpg?t=1766141193",
  },
  {
    id: 4,
    name: "Battlefield 6",
    rating: 3.5,
    comment: "Good graphics.",
    timesFinished: 1,
    steamStoreUrl: "https://store.steampowered.com/app/2807960/Battlefield_6/",
    artworkUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2807960/c12d12ce3c7d217398d3fcad77427bfc9d57c570/header.jpg?t=1765583938",
  },
];

const Games = () => {
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
            game.name.toLowerCase().includes(search.toLowerCase())
          )}
        />
      </Flex>
    </>
  );
};
export default Games;
