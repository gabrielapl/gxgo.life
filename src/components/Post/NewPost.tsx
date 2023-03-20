import { useAuth } from "@/hooks/useAuth";
import { GetPostResponse } from "@/pages/home";
import { api } from "@/service/api";
import { queryClient } from "@/service/queryClient";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "react-query";

import { Avatar } from "../Avatar";

export function NewPost() {
  const { user } = useAuth();
  const [post, setPost] = useState("");

  const createPost = useMutation(
    async (post: string) => {
      const response = await api.post("create-post", {
        message: post,
        user_id: user?.id,
      });

      return response.data;
    },
    {
      onSuccess: (data) => {
        const post: GetPostResponse = {
          post: {
            id: data.id,
            created_at: data.created_at,
            message: data.message,
          },
          user: {
            ...user!,
          },
        };

        setPost("");
        queryClient.invalidateQueries("my-posts");
        queryClient.setQueryData<GetPostResponse[]>(["posts"], (posts) => {
          if (posts && posts.length >= 0) {
            return [post, ...posts];
          } else {
            return [post];
          }
        });
      },
    }
  );

  return (
    <Box px="4" py="6" w="full" bg="gray.900" borderRadius="lg">
      <Flex w="full" align="center" gap="8">
        <Avatar url={user?.avatar ?? ""} />
        <Textarea
          placeholder="Here is a sample placeholder"
          border="none"
          bg="gray.800"
          minHeight="16"
          maxHeight="16"
          maxLength={200}
          onChange={(e) => setPost(e.target.value)}
          value={post}
        />
      </Flex>

      <HStack align="center" justify="flex-end" mt="4" spacing="4">
        <Text
          fontWeight="medium"
          color={
            post.length < 180
              ? "white"
              : post.length === 200
              ? "red.700"
              : "red.300"
          }
        >
          {post.length}/200
        </Text>

        <Center height="4">
          <Divider orientation="vertical" />
        </Center>

        <Button
          disabled={post.length === 0}
          type="button"
          colorScheme="purple"
          size="md"
          onClick={() => createPost.mutateAsync(post)}
        >
          New Post
        </Button>
      </HStack>
    </Box>
  );
}
