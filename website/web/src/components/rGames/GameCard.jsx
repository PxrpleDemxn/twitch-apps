import { Box, Card, Text } from "@radix-ui/themes";
import { Inset } from "@radix-ui/themes";
import { Link } from "react-router";

const GameCard = (props) => {
  return (
    <Box>
      <Card>
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src={props.game.artworkUrl}
            alt={props.game.name}
            style={{
              display: "block",
              objectFit: "contain",
              width: "100%",
              height: 215,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Text as="p" align="center" weight="bold">
          {props.game.name}
        </Text>
        <Text as="p">Rating: {props.game.rating}/5</Text>
        <Text as="p">Comment: {props.game.comment}</Text>
        <Link href={props.game.steamStoreUrl} fullWidth mt="2" variant="solid">
          Koupit
        </Link>
      </Card>
    </Box>
  );
};
export default GameCard;
