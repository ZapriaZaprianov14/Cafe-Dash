import React from "react";
import { FlatList, SectionList, View, Text } from "react-native";
import ItemCard from "@/app/components/ItemCard/ItemCard";
import { Product } from "@/app/types/items";
import styles from "./ItemsList.style";

interface ItemsList {
  products: Product[];
}

const ItemsList = ({ products }: ItemsList) => {
  const sections = [
    {
      title: "Drinks",
      data: Array.isArray(products)
        ? products.filter((item) => item.productType === "DRINKS")
        : [],
    },
    {
      title: "Promotion",
      data: Array.isArray(products)
        ? products.filter((item) => item.productType === "PROMO")
        : [],
    },
    {
      title: "Eating",
      data: Array.isArray(products)
        ? products.filter((item) => item.productType === "EATING")
        : [],
    },
  ].filter((section) => section.data.length > 0);

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.id.toString()}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      renderItem={({}) => null}
      renderSectionFooter={({ section }) => (
        <FlatList
          data={section.data}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <ItemCard product={item} />
            </View>
          )}
          contentContainerStyle={styles.itemList}
        />
      )}
      contentContainerStyle={styles.listContent}
    />
  );
};
export default ItemsList;
