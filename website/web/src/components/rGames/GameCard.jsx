import { Box, Card, Text, Flex, Badge, Button } from "@radix-ui/themes";
import { StarIcon, ExternalLinkIcon, SymbolIcon } from "@radix-ui/react-icons";

const GameCardHorizontal = ({ game }) => {
  return (
    <Box width="900px" py="10px">
      <Card
        size="2"
        variant="surface"
        style={{ transition: "transform 0.2s", overflow: "hidden", padding: 0 }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <Flex direction="row">
          <Box width="230px" height="100%" style={{ flexShrink: 0 }}>
            <img
              src={game.artworkUrl}
              alt={game.name}
              style={{
                display: "block",
                objectFit: "cover",
                width: "100%",
                height: "100%",
                backgroundColor: "var(--gray-5)",
              }}
            />
          </Box>

          <Flex
            direction="column"
            justify="between"
            p="3"
            style={{ flexGrow: 1 }}
          >
            <Box>
              <Flex justify="space-between" align="start" mb="2">
                <Box>
                  <Text as="div" size="4" weight="bold">
                    {game.name}
                  </Text>
                </Box>

                <Flex gap="3" align="center">
                  <Flex align="center" gap="1">
                    <SymbolIcon color="gray" width="14" height="14" />
                    <Text size="2" color="gray" weight="medium">
                      {game.timesFinished}×
                    </Text>
                  </Flex>

                  <Badge color="yellow" variant="soft" highContrast size="2">
                    <Flex align="center" gap="1">
                      <StarIcon width="14" height="14" />
                      {game.rating}
                    </Flex>
                  </Badge>
                </Flex>
              </Flex>

              <Text
                as="p"
                size="2"
                color="gray"
                style={{ fontStyle: "italic", lineHeight: "1.4" }}
              >
                {game.description}
              </Text>
            </Box>

            <Flex justify="end" mt="2">
              <Button
                disabled={!game.steamStoreUrl}
                asChild
                variant="soft"
                color="indigo"
                size="1"
                style={{ cursor: "pointer" }}
              >
                <a href={game.steamStoreUrl} target="_blank" rel="noreferrer">
                  Koupit <ExternalLinkIcon />
                </a>
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Box>
  );
};

export default GameCardHorizontal;
