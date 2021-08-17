import React, { useState } from "react";
import { AtSignIcon, PhoneIcon, TimeIcon } from "@chakra-ui/icons";
import {
  Badge,
  Button,
  Flex,
  Grid,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";

import { useCart } from "../../components/Context";
import FoodCardItem from "../../components/FoodCardItem";
import CardItemModal from "../../components/CardItemModal";
import categories from "../../menu.json";
import { CartType, FoodData } from "../../types";
import Cart from "../../components/Cart";

type openType = Record<string, boolean>;
const initialStateOpen = {
  openCart: false,
  openCartItem: false,
};

export default function Home() {
  const { cart, addNewItem, deleteItem, totalCartItem } = useCart();
  const [open, setOpen] = useState<openType>(initialStateOpen);
  const [filter, setFilter] = useState<string>();
  const [detail, setDetail] = useState<FoodData>();

  function handleSetOpen(dialog: string) {
    setOpen((prevState) => {
      return { ...prevState, [dialog]: !prevState[dialog] };
    });
  }
  function handleOnReDirectInstagram() {
    window.location.href = "https://www.instagram.com/stokehouse.burger/";
  }
  function handleOnClickFilter(value?: string) {
    setFilter(value);
  }
  function handleOnClickCart(orderItem: CartType) {
    addNewItem(orderItem);
    handleSetOpen("openCart");
  }
  function handleOnClick(item: FoodData) {
    handleSetOpen("openCartItem");
    setDetail(item);
  }
  console.log(categories);
  return (
    <VStack width="100%" display="flex" justifyContent="center">
      <Button onClick={() => handleSetOpen("openCart")}>Mi orden</Button>

      <Image src="Images/logo.jpg" boxSize="300px" objectFit="fill" />
      <Text s="samp" fontSize="xl" fontWeight="bolder">
        Stoke House Burgers
      </Text>
      <Flex flexDirection="column">
        <Flex margin="2">
          <TimeIcon />
          <Text s="samp" fontSize="lg">
            8 P.M. - 12 P.M.
          </Text>
        </Flex>

        <Flex margin="2">
          <PhoneIcon />
          <Text s="samp" fontSize="lg" fontWeight="bolder">
            11 7360-7946
          </Text>
        </Flex>

        <Flex onClick={handleOnReDirectInstagram} margin="2">
          <AtSignIcon />
          <Text s="samp" fontSize="lg" fontWeight="bolder">
            stokehouse.burger
          </Text>
        </Flex>
      </Flex>
      <Flex overflow="scroll" justifyContent="center" width="100%">
        <Button
          colorScheme="teal"
          margin="8px"
          variant={filter ? "solid" : "outline"}
          onClick={() => handleOnClickFilter()}
        >
          Todas las categorias
        </Button>
        {categories.map((category) => (
          <Button
            key={category.name}
            colorScheme="teal"
            margin="8px"
            variant={filter === category.name ? "solid" : "outlined"}
            onClick={() => handleOnClickFilter(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </Flex>

      <Badge
        colorScheme="red"
        badgeContent={totalCartItem}
        anchorOrigin={{ horizontal: "left", vertical: "top" }}
      ></Badge>
      <Grid flexDirection="column" width="100%">
        {categories
          .filter((category) => !filter || (filter && category.name === filter))
          .map((category) => (
            <Grid key={category.name} width="100%">
              <Text as="samp" fontSize="xl" fontWeight="bolder" padding="5px">
                {category.name}
              </Text>

              <Grid
                width="100%"
                gridTemplateColumns="repeat(auto-fill,minmax(300px, 1fr))"
                alignItems="center"
                justifyContent="center"
              >
                {category.items.map((item) => (
                  <FoodCardItem
                    key={item.id}
                    onClick={() => handleOnClick(item as FoodData)}
                    image={item.image}
                    itemName={item.name}
                    description={item.description}
                    sizes={item.sizes as Record<string, number>}
                  />
                ))}
              </Grid>
            </Grid>
          ))}
      </Grid>
      <Flex>
        {detail && (
          <CardItemModal
            key={detail.id}
            open={open.openCartItem}
            setOpen={() => handleSetOpen("openCartItem")}
            options={detail.options}
            image={detail.image}
            nameItem={detail.name}
            description={detail.description}
            excludedItems={detail.excludedItems}
            sizes={detail.sizes}
            onClickAddItem={handleOnClickCart}
          />
        )}
      </Flex>
      {Cart && (
        <Cart
          open={open.openCart}
          setOpen={() => handleSetOpen("openCart")}
          handleOnDelete={deleteItem}
        />
      )}
    </VStack>
  );
}
