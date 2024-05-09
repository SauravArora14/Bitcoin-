import React, { useEffect } from "react";
import axios from "axios";
import { server } from "../index";
import { useState } from "react";
import Loader from "./Loader";
import { HStack, VStack, Image, Heading, Text, Container } from "@chakra-ui/react";
import ErrorComponents from "./ErrorComponents";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchExchanges = async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges`);

        setExchanges(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };
    fetchExchanges();
  }, []);
  if (error) return <ErrorComponents msg={"Error while fetching"} />;
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};
const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack
      w={"52"}
      shadow={"lg"}
      borderRadius={"lg"}
      transition={"all "}
      m={"4"}
      css={{
        "&:hover": {
          transform: "Scale(1.1)",
        },
      }}
    >
      <Image src={img} w={"12"} height={"10"} objectfit={"contain"} alt={"Exchange"} />
      <Heading size={"md"} noOfLines={1}>
        {rank}
      </Heading>
      <Text noOfLines={1}>{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
