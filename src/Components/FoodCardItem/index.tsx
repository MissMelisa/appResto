import React from "react";
import { Flex, Image, Text } from "@chakra-ui/react";

type TypeFoodCardItem = {
  image: string;
  itemName: string;
  description?: string;
  sizes: Record<string, number>;
  onClick: () => void;
};

export default function FoodCardItem({
  image,
  itemName,
  description,
  sizes,
  onClick,
}: TypeFoodCardItem) {
  const defaultSize = Object.values(sizes)[0];
  return (
    <Flex
      onClick={onClick}
      flexDirection="column"
      width="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Image src={image} boxSize="250px" objectFit="fill" />
      <Text>{itemName}</Text>
      <Text as="em" fontWeight="bold" fontSize="lg">
        ${defaultSize}
      </Text>
      <Text fontSize="sm" as="i">
        {description}
      </Text>
    </Flex>
  );
}
