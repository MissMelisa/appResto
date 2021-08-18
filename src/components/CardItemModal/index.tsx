import {
  Button,
  ButtonGroup,
  Checkbox,
  Flex,
  FormControl,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { CartType, Size } from "../../types";
import FoodItemOptions from "../FoodItemOptions";

type TypeCardItemModal = {
  image?: string;
  sizes: Record<string, number>; // { [k: string]: number }
  description?: string;
  nameItem: string;
  onClickAddItem: (orderItem: CartType) => void;
  options: Record<string, string[]>;
  excludedItems: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
};
type SelectedOptionType = Record<string, string>;

export default function CardItemModal({
  image,
  sizes,
  description,
  nameItem,
  onClickAddItem,
  options,
  excludedItems,
  open,
  setOpen,
}: TypeCardItemModal) {
  const objectSizes: Size[] = Object.entries(sizes).map(([key, value]) => ({
    size: key,
    price: value,
  }));
  const [error, setError] = useState<boolean>(false);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<Size>(objectSizes[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptionType>(
    {}
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setExcludedIngredients([...excludedIngredients, event.target.name]);
    } else {
      const newArray = excludedIngredients.filter((excludedIngredient) => {
        return excludedIngredient !== event.target.name;
      });

      setExcludedIngredients(newArray);
    }
  };

  function handleOnClickSelected(selected: Size) {
    setError(false);

    setSelectedSize(selected);
  }
  function handleOnClickAdd() {
    const orderItem = {
      nameItem,
      selectedSize,
      excludedItems: excludedIngredients,
      image,
      quantity,
      selectedOptions,
    };

    if (!selectedSize.size) {
      setError(true);
      return;
    }

    onClickAddItem(orderItem);

    setExcludedIngredients([]);
    setSelectedSize(objectSizes[0]);
    setSelectedOptions({});
    setOpen(false);
  }
  function handleOnOptions(title: string, option: string) {
    setError(false);
    setSelectedOptions((prevState) => ({ ...prevState, [title]: option }));
  }
  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={open}
      onClose={handleClose}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize="3xl">{nameItem}</ModalHeader>
        <ModalCloseButton />
        <ModalBody display="flex" flexDirection="column" alignItems="center">
          <Image src={image} boxSize="300px" objectFit="cover" />
          <Text as="samp" fontSize="lg">
            {description}
          </Text>
          <VStack>
            {excludedItems.length >= 1 && (
              <Text as="samp" fontSize="lg" fontWeight="bolder">
                Excluir
              </Text>
            )}

            {excludedItems.map((excludedItem) => (
              <FormControl id={excludedItem}>
                <Checkbox
                  key={excludedItem}
                  name={excludedItem}
                  value={excludedItem}
                  checked={excludedIngredients.includes(excludedItem)}
                  onChange={handleChange}
                  colorScheme="teal"
                />

                {excludedItem}
              </FormControl>
            ))}
          </VStack>
          <VStack>
            <Text as="samp" fontSize="lg" marginTop="10" fontWeight="bolder">
              Tamaño
            </Text>
            {objectSizes.length > 1 && (
              <ButtonGroup
                colorScheme="teal"
                variant="solid"
                display="flex"
                flexDirection="column"
              >
                {objectSizes.map((size) => {
                  const { size: key, price } = size;
                  return (
                    <Button
                      key={key}
                      colorScheme="teal"
                      variant={key === selectedSize.size ? "solid" : "outline"}
                      margin="10px"
                      onClick={() => handleOnClickSelected(size)}
                    >
                      {key} $ {price}
                    </Button>
                  );
                })}
              </ButtonGroup>
            )}
            {error === true && <Text>Seleccione el tamaño</Text>}
          </VStack>
          <Flex flexDirection="column">
            {Object.entries(options).map((option) => {
              const [title, values] = option;

              return (
                <FoodItemOptions
                  key={title}
                  error={error}
                  selectedOption={selectedOptions[title]}
                  title={title}
                  options={values}
                  onClick={handleOnOptions}
                />
              );
            })}
          </Flex>
          <Flex margin="20px" flexDirection="column">
            <Text as="samp" fontSize="lg">
              Cantidad
            </Text>
            <NumberInput defaultValue={1} min={0} max={20}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>

          <Button
            onClick={handleOnClickAdd}
            colorScheme="teal"
            variant="solid"
            margin="10px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginBottom="5px"
            flexDirection="column"
          >
            Agregar $ {selectedSize.price}
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
