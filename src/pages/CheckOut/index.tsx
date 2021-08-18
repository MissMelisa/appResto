import React, { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCart } from "../../components/Context";
import OrderItem from "../../components/OrderItem";

export default function CheckOut() {
  const { cart, updateItemQuantity, deleteItem } = useCart();
  const [order, setOrder] = useState({
    name: "",
    address: "",
    cash: "",
    comments: "",
    total: "",
  });
  const total = cart.reduce((subTotal, cartItem) => {
    subTotal = subTotal + cartItem.quantity * cartItem.selectedSize.price;
    return subTotal;
  }, 0);

  function handleOnChangeOrder(ev: React.ChangeEvent<HTMLInputElement>) {
    setOrder((prevState) => ({
      ...prevState,
      [ev.target.name]: ev.target.value,
    }));
  }

  function handleOnSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    let intro = "Hola,me gustaria realizar una orden 🛵🔜🏡 :  ";

    cart.forEach((item) => {
      intro += `${item.quantity} ${item.nameItem} ${
        item.selectedSize.size
      } : ${Object.values(item.selectedOptions)}\n`;

      // intro -> hola, me gustaria realizar una orden + 4 cheeseburger XL, 2 big mac M

      if (item.excludedItems.length >= 1)
        // hola, me gustaria realizar una orden 4 cheeseburger XL, 2 big mac M + sin pepino
        intro += ` sin ${item.excludedItems.join()} \n`;
    });
    const itemsTotal = total;
    const dataClient = `📍  *Datos del cliente* \n Mi nombre es: ${order.name}\n Direccion: ${order.address}\n🧾Abonare con: $ ${order.cash}\n🗒Comentario: ${order.comments} \n Total: $ `;
    const finalMessage = encodeURIComponent(
      `${intro}${dataClient}${itemsTotal}`
    );
    window.location.href = `https://wa.me/5491173607946?text=${finalMessage}`;
  }

  return (
    <VStack
      width="100%"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
    >
      <Flex justifyContent="center" flexDirection="column" alignItems="center">
        <Image src="Images/logo.jpg" boxSize="300px" objectFit="fill" />
        <Text s="samp" fontSize="5xl" fontWeight="bolder">
          Stoke House Burgers
        </Text>
      </Flex>
      <FormControl
        onSubmit={handleOnSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        maxWidth="500px"
      >
        <Text as="samp" fontSize="xl" fontWeight="bolder" padding="5px">
          Tu pedido
        </Text>
        <Box
          display="flex"
          justifyContent="center"
          overflow="scroll"
          width="100%"
          height="100%"
          maxHeight="500px"
          maxWidth="700px"
          margin="25px"
          borderWidth="1px"
          borderRadius="lg"
        >
          {cart.map((item) => (
            <OrderItem
              key={item.id}
              updateQuantity={updateItemQuantity}
              handleOnDelete={deleteItem}
              nameItem={item.nameItem}
              id={item.id as number}
              image={item.image}
              quantity={item.quantity}
              price={item.selectedSize.price}
              size={item.selectedSize.size}
              excludedItems={item.excludedItems}
            />
          ))}
        </Box>
        <Flex
          width="100%"
          alignItems="center"
          flexDirection="column"
          marginTop="10px"
        >
          <FormLabel as="samp" fontSize="xl" fontWeight="bolder" padding="5px">
            Tu nombre
          </FormLabel>
          <Input
            isRequired
            onChange={handleOnChangeOrder}
            id="name"
            name="name"
          />
        </Flex>
        <Flex width="100%" alignItems="center" flexDirection="column">
          <FormLabel as="samp" fontSize="xl" fontWeight="bolder" padding="5px">
            Direccion de entrega
          </FormLabel>
          <Input
            isRequired
            onChange={handleOnChangeOrder}
            id="address"
            name="address"
          />
        </Flex>
        <Flex width="100%" alignItems="center" flexDirection="column">
          <FormLabel as="samp" fontSize="xl" fontWeight="bolder" padding="5px">
            Abona con...
          </FormLabel>
          <Input
            isRequired
            onChange={handleOnChangeOrder}
            id="cash"
            name="cash"
          />
        </Flex>
        <Flex width="100%" alignItems="center" flexDirection="column">
          <FormLabel as="samp" fontSize="xl" fontWeight="bolder" padding="5px">
            Comentarios
          </FormLabel>
          <Input onChange={handleOnChangeOrder} id="comments" name="comments" />
        </Flex>{" "}
        <Text
          as="samp"
          fontSize="xl"
          margin="5px"
          fontWeight="bolder"
          padding="5px"
        >
          Finalizar tu pedido
        </Text>
        <Box
          margin="20px"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          padding="15px"
        >
          <Text as="i" fontWeight="bold" fontSize="4xl">
            Total: $
            {cart.reduce((subTotal, cart) => {
              subTotal = subTotal + cart.quantity * cart.selectedSize.price;
              return subTotal;
            }, 0)}
          </Text>
          <Text as="i" fontSize="sm" color="red">
            *el precio es sin costo de envio
          </Text>
        </Box>
        <Button margin="5px" colorScheme="teal" size="md" type="submit">
          Enviar pedido por WhatsApp
        </Button>
      </FormControl>
    </VStack>
  );
}
