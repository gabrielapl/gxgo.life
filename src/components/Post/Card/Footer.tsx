import { Button, CardFooter } from "@chakra-ui/react";
import { Heart, Chat, Share } from "@phosphor-icons/react";

export function Footer() {
  return (
    <CardFooter
      justify="space-between"
      flexWrap="wrap"
      sx={{
        "& > button": {
          minW: "136px",
        },
      }}
    >
      <Button
        color="white"
        flex="1"
        variant="ghost"
        leftIcon={<Heart color="white" />}
      >
        Like
      </Button>

      <Button
        color="white"
        flex="1"
        variant="ghost"
        leftIcon={<Share color="white" />}
      >
        Share
      </Button>
    </CardFooter>
  );
}
