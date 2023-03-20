import {
  Avatar as AvatarChakra,
  AvatarProps as AvatarPropsChakra,
} from "@chakra-ui/react";

interface AvatarProps extends AvatarPropsChakra {
  url: string;
}

export function Avatar({ url, ...rest }: AvatarProps) {
  return (
    <AvatarChakra
      size="md"
      name="Gabriel Gxguinho"
      src={url}
      bg="red.800"
      {...rest}
    />
  );
}
