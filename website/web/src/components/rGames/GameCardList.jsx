import { Flex, Grid } from "@radix-ui/themes";
import GameCard from "./GameCard";

const GameCardList = (props) => {
  return (
    <Flex justify="center" direction="column">
      {props.gameList.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </Flex>
  );
};
export default GameCardList;
