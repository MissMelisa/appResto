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
    <VStack>
      <Flex>
        <Image />
        <Text> Stoke House Burgers</Text>
      </Flex>
      <FormControl onSubmit={handleOnSubmit}>
        <Box>
          <Text>Tu pedido</Text>
          {cart.map((item) => (
            <OrderItem
              key={item.id}
              updateQuantity={updateItemQuantity}
              handleOnDelete={deleteItem}
              nameItem={item.nameItem}
              id={item.id}
              image={item.image}
              quantity={item.quantity}
              price={item.selectedSize.price}
              size={item.selectedSize.size}
              excludedItems={item.excludedItems}
            />
          ))}
        </Box>
        <Box>
          <FormLabel>Tu nombre</FormLabel>
          <Input
            isRequired
            onChange={handleOnChangeOrder}
            id="name"
            name="name"
          />
        </Box>
        <Box>
          <FormLabel>Direccion de entrega</FormLabel>
          <Input
            isRequired
            onChange={handleOnChangeOrder}
            id="address"
            name="address"
          />
        </Box>
        <Box>
          <FormLabel>Abona con...</FormLabel>
          <Input
            isRequired
            onChange={handleOnChangeOrder}
            id="cash"
            name="cash"
          />
        </Box>
        <Box>
          <FormLabel>Comentarios</FormLabel>
          <Input onChange={handleOnChangeOrder} id="comments" name="comments" />
        </Box>
        <Box>
          <Text>Finalizar tu pedido</Text>
          <Text>
            Total: $
            {cart.reduce((subTotal, cart) => {
              subTotal = subTotal + cart.quantity * cart.selectedSize.price;
              return subTotal;
            }, 0)}
          </Text>
          <Text>*el precio es sin costo de envio</Text>
        </Box>
        <Button type="submit">Enviar pedido por WhatsApp</Button>
      </FormControl>
    </VStack>
  );
}
