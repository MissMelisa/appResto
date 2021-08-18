import { AddIcon, DeleteIcon, MinusIcon } from "@chakra-ui/icons";
import { Button, ButtonGroup, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";

type OrderItemData = {
  nameItem: string;
  id: number;
  description?: string;
  excludedItems: string[];
  image?: string;
  size: string;
  price: number;
  quantity: number;
  updateQuantity: (newQuantity: number, id: number) => void;
  handleOnDelete: (id: number) => void;
};
export default function OrderItem({
  nameItem,
  id,
  description,
  excludedItems,
  image,
  price,
  size,
  quantity,
  updateQuantity,
  handleOnDelete,
}: OrderItemData) {
  function handleOnClickAdd(newQuantity: number) {
    updateQuantity(newQuantity, id);
  }
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      margin="5px"
      width="100%"
    >
      <Image src={image} boxSize="200px" objectFit="cover" />
      <Text fontWeight="bolder">{nameItem}</Text>
      <Text as="i">{description}</Text>
      <Text as="i">{excludedItems}</Text>
      <Text as="i">{size}</Text>
      <Text>
        {quantity} X ${price * quantity}
      </Text>
      <Flex flexDirection="column">
        <ButtonGroup>
          <Button onClick={() => handleOnClickAdd(1)}>
            <AddIcon />
          </Button>
          <Button onClick={() => handleOnClickAdd(-1)}>
            <MinusIcon />
          </Button>
          <Button onClick={() => handleOnDelete(id)}>
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </Flex>
    </Flex>
  );
}
