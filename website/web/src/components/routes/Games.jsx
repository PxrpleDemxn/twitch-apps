import GameCardList from "../rGames/GameCardList";

const gameList = [
  {
    id: 1,
    name: "Dying Light",
    rating: 4.5,
    comment: "Nice game!",
    steamStoreUrl: null,
    artworkUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/239140/f287172af4c5358f923523fe94faa1bd9d0007c7/header.jpg?t=1763646303",
  },
  {
    id: 2,
    name: "Ninja Gaiden 4",
    rating: 4.0,
    comment: "Awesome!",
    steamStoreUrl: "https://store.steampowered.com/app/2627260/NINJA_GAIDEN_4/",
    artworkUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2627260/header.jpg?t=1762366827",
  },
  {
    id: 3,
    name: "Cyberpunk 2077",
    rating: 5.0,
    comment: "Great game!",
    steamStoreUrl: "https://store.steampowered.com/app/1091500/Cyberpunk_2077/",
    artworkUrl:
      "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/e9047d8ec47ae3d94bb8b464fb0fc9e9972b4ac7/header.jpg?t=1766141193",
  },
];

const Games = () => {
  return GameCardList({ gameList });
};
export default Games;
