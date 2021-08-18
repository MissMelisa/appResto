import { useCart } from "../Context";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
} from "@chakra-ui/react";
import OrderItem from "../OrderItem";
import { WarningTwoIcon } from "@chakra-ui/icons";

type CartData = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleOnDelete: (id: number) => void;
};

export default function Cart({ open, setOpen, handleOnDelete }: CartData) {
  const { cart, updateItemQuantity } = useCart();

  let history = useHistory();

  const handleClose = () => {
    setOpen(true);
  };

  function handleOnClickFinishedBuying() {
    return history.push("/checkout");
  }
  return (
    <Drawer size="sm" onClose={handleClose} isOpen={open} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader
          as="samp"
          alignItems="center "
          display="flex"
          justifyContent="center"
        >
          Tu compra
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          {cart.length >= 1 ? (
            <Flex flexDirection="column" width="100%">
              {cart.map((item) => (
                <OrderItem
                  id={item.id as number}
                  updateQuantity={updateItemQuantity}
                  handleOnDelete={handleOnDelete}
                  nameItem={item.nameItem}
                  image={item.image}
                  quantity={item.quantity}
                  price={item.selectedSize.price}
                  size={item.selectedSize.size}
                  excludedItems={item.excludedItems}
                />
              ))}
              <Text
                padding="5px"
                alignItems="center "
                display="flex"
                justifyContent="center"
                as="kbd"
                fontWeight="bolder"
                borderWidth="1px"
                borderRadius="sm"
                margin="5px"
              >
                Total: $
                {cart.reduce((subTotal, cartItem) => {
                  subTotal =
                    subTotal + cartItem.quantity * cartItem.selectedSize.price;
                  return subTotal;
                }, 0)}
              </Text>
              <Button
                onClick={handleOnClickFinishedBuying}
                margin="5px"
                colorScheme="teal"
                size="md"
              >
                Finalizar tu pedido
              </Button>
              <Button
                onClick={handleClose}
                margin="5px"
                colorScheme="teal"
                size="md"
              >
                Seguir comprando
              </Button>
            </Flex>
          ) : (
            <Box
              maxW="sm"
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              <WarningTwoIcon width="30px" height="30px" margin="5px" />
              <Text fontSize="3xl" fontWeight="bolder">
                Tu carrito esta vacio
              </Text>
              <Button
                onClick={handleClose}
                margin="10px"
                colorScheme="teal"
                size="md"
              >
                Seguir comprando
              </Button>
            </Box>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
