import React from "react";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

type TypeFoodCardItem = {
  image: string;
  itemName: string;
  description: string;
  sizes: string[];
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
    <VStack onClick={onClick}>
      <Box>
        <Image src={image} />
        <Text>{itemName}</Text>
        <Text>${defaultSize}</Text>
        <Text>{description}</Text>
      </Box>
    </VStack>
  );
}
