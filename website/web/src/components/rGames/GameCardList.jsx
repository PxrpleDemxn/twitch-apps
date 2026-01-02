import { Box, Grid } from "@radix-ui/themes";
import GameCard from "./GameCard";

const GameCardList = (props) => {
  return (
    <Grid columns="3" gap="3" rows="repeat(2, 64px)" width="auto">
      {props.gameList.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </Grid>
  );
};
export default GameCardList;
