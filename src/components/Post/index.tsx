import { Card } from "@chakra-ui/react";
import { Body } from "./Card/Body";
import { Footer } from "./Card/Footer";
import { Header } from "./Card/Header";

interface PostProps {
  user: {
    username: string;
    name: string;
    avatar: string;
  };

  createdAt: Date;
  message: string;
}

export function Post({ message, user, createdAt }: PostProps) {
  return (
    <Card maxW="full" bg="gray.900" borderRadius="lg" w="full">
      <Header data={user} createdAt={createdAt} />
      <Body message={message} />
      <Footer />
    </Card>
  );
}
