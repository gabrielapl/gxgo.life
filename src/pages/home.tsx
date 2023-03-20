import { Header } from "@/components/Header";
import { Post } from "@/components/Post";
import { NewPost } from "@/components/Post/NewPost";
import { Sidebar } from "@/components/Sidebar";
import { User } from "@/context/AuthProvider";
import { api } from "@/service/api";
import { withSSRAuth } from "@/utils/withSSRAuth";
import { Box, Flex, Spinner, VStack } from "@chakra-ui/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { Post as PostInterface } from "./profile";

export interface GetPostResponse {
  post: PostInterface;
  user: User;
}

interface fetchDataResponse {
  nextPage: number | null;
  data: Array<GetPostResponse>;
}

export default function Home() {
  const loaderRef = useRef(null);

  /* const { data, isLoading, isError } = useQuery<GetPostResponse[]>(
    ["posts"],
    async () => {
      const response = await api.get(`/get-posts/${page}`);

      return response.data;
    }
  ); */

  const fetchPosts = async ({ pageParam = 1 }): Promise<fetchDataResponse> => {
    const { data } = await api.get(`/get-posts/${pageParam}`);

    return {
      data,
      nextPage: pageParam + 1,
    };
  };

  const { data, fetchNextPage, isFetching, hasNextPage } = useInfiniteQuery(
    "posts",
    fetchPosts,
    {
      getNextPageParam: (lastPage, _) => lastPage.nextPage,
    }
  );

  const formattedData = useMemo(() => {
    const arrayData = data?.pages.flatMap((page) => page.data);
    return arrayData;
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
          <VStack spacing="8">
            <NewPost />

            {formattedData?.map((data) => (
              <Post
                key={data.post.id}
                createdAt={data.post.created_at}
                message={data.post.message}
                user={data.user}
              />
            ))}

            <div ref={loaderRef}>{isFetching && <Spinner />}</div>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
