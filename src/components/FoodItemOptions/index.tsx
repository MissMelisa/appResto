import { Button, ButtonGroup, Text, VStack } from "@chakra-ui/react";
import React from "react";

type FoodItemOptionsType = {
  title: string;
  options: string[];
  onClick: (title: string, option: string) => void;
  selectedOption: string;
  error: boolean;
};

export default function FoodItemOptions({
  title,
  options,
  onClick,
  selectedOption,
  error,
}: FoodItemOptionsType) {
  return (
    <VStack>
      <Text s="samp" fontSize="lg" marginTop="10" fontWeight="bolder">
        {title}
      </Text>
      <ButtonGroup
        colorScheme="teal"
        variant="solid"
        margin="10px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        marginBottom="5px"
        flexDirection="column"
      >
        {options.map((option) => (
          <Button
            colorScheme="teal"
            margin="10px"
            marginBottom="5px"
            flexDirection="column"
            onClick={() => onClick(title, option)}
            variant={option === selectedOption ? "solid" : "outline"}
          >
            {option}
          </Button>
        ))}
      </ButtonGroup>
    </VStack>
  );
}
