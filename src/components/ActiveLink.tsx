import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";
import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";

interface ActiveLinkProps extends ChakraLinkProps {
  children: ReactElement;
  shouldMatchExactHref?: boolean;
}

export function ActiveLink({
  children,
  shouldMatchExactHref = false,
  ...rest
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  let isActive = false;

  if (shouldMatchExactHref && (asPath == rest.href || asPath == rest.as)) {
    isActive = true;
  }

  if (
    (!shouldMatchExactHref && asPath.startsWith(String(rest.href))) ||
    asPath.startsWith(String(rest.as))
  ) {
    isActive = true;
  }

  return (
    <ChakraLink as={Link} {...rest}>
      {cloneElement(children, {
        background: isActive ? "purple.400" : "transparent",
      })}
    </ChakraLink>
  );
}
