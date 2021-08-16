import {
  Button,
  ButtonGroup,
  Checkbox,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

type TypeCardItemModal = {
  image: string;
  sizes: Record<string, number>; // { [k: string]: number }
  description: string;
  nameItem: string;
  onClickAddItem: () => void;
  options: Record<string, string[]>;
  excludedItems: string[];
};

type Size = {
  size: string;
  price: number;
};

export default function CardItemModal({
  image,
  sizes,
  description,
  nameItem,
  onClickAddItem,
  options,
  excludedItems,
}: TypeCardItemModal) {
  const { isOpen, onClose } = useDisclosure();

  const objectSizes: Size[] = Object.entries(sizes).map(([key, value]) => ({
    size: key,
    price: value,
  }));
  const [error, setError] = useState<boolean>(false);
  const [excludedIngredients, setExcludedIngredients] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<Size>(objectSizes[0]);

  // [string, number]

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

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{nameItem}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Image src={image} />
          <Text>{description}</Text>
          <VStack>
            {excludedItems.length >= 1 && <Text>Excluir</Text>}
            {excludedItems.map((excludedItem) => (
              <Checkbox
                key={excludedItem}
                name={excludedItem}
                label={excludedItem}
                checked={excludedIngredients.includes(excludedItem)}
                onChange={handleChange}
              />
            ))}
          </VStack>
          <VStack>
            {objectSizes.length > 1 && (
              <ButtonGroup>
                {objectSizes.map((size) => {
                  const { size: key, price } = size;
                  return (
                    <Button
                      key={key}
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
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
