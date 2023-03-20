import { Avatar } from "@/components/Avatar";
import { Header } from "@/components/Header";
import { Post } from "@/components/Post";
import { NewPost } from "@/components/Post/NewPost";
import { Sidebar } from "@/components/Sidebar";
import { User } from "@/context/AuthProvider";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/service/api";
import { withSSRAuth } from "@/utils/withSSRAuth";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";

export interface Post {
  id: string;
  message: string;
  created_at: Date;
}

interface GetPostResponse {
  posts: Post[];
  user: User;
}

interface fetchDataResponse {
  nextPage: number | null;
  data: GetPostResponse;
}

export default function Profile() {
  const { user } = useAuth();
  const loaderRef = useRef(null);

  const fetchPosts = async ({ pageParam = 1 }): Promise<fetchDataResponse> => {
    const { data } = await api.get(
      `/get-posts-by-user/${user?.id}/${pageParam}`
    );

    return {
      data,
      nextPage: pageParam + 1,
    };
  };

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    "my-posts",
    fetchPosts,
    {
      getNextPageParam: (lastPage, _) => lastPage.nextPage,
    }
  );

  const formattedData = useMemo(() => {
    const arrayDataPosts = data?.pages.flatMap((page) => page.data.posts);

    return arrayDataPosts;
  }, [data]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver((entities) => {
      const target = entities[0];

      if (target.isIntersecting) {
        fetchNextPage();
      }
    }, options);

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
  }, []);

  return (
    <Flex direction="column" h="100vh" w="100%">
      <Box w="100%" maxWidth={1480} mx="auto">
        <Header />
      </Box>

      <Flex w="100%" maxWidth={1480} mx="auto" px="6" mt="24" pb="24">
        <Sidebar />

        {user != null ? (
          <Box
            as="main"
            flex="1"
            bg="gray.800"
            borderRadius="2xl"
            h="full"
            ml={288}
            p="8"
            style={{ minHeight: "calc(100vh - 120px)" }}
          >
            <Box as="header" mb="8">
              <Flex>
                <Box>
                  <Avatar url={user?.avatar ?? ""} mb="4" size="2xl" />
                  <Heading size="sm" color="white" mb="2">
                    {user?.name}
                  </Heading>
                  <Text color="whiteAlpha.600">{user?.username}</Text>
                </Box>

                <Button type="button" colorScheme="purple" size="sm" ml="auto">
                  Editar perfil
                </Button>
              </Flex>
            </Box>

            <Divider mb="8" />
            <VStack spacing="8">
              {formattedData?.map((data) => (
                <Post
                  key={data.id}
                  createdAt={data.created_at}
                  message={data.message}
                  user={user!}
                />
              ))}

              <div ref={loaderRef}>{isFetching && <Spinner />}</div>
            </VStack>
          </Box>
        ) : (
          <Spinner />
        )}
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
