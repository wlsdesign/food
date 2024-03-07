import React, { useState, useRef } from 'react'
import { View, Text, FlatList, SectionList } from 'react-native'

import { Link } from 'expo-router'

import { useCartStore } from '@/stores/cart-store'
import { CATEGORIES, MENU, ProductProps } from '@/utils/data/products'

import { CategoryButton } from '@/components/category-button'
import { Header } from '@/components/header'
import { Product } from '@/components/product'

export default function Home() {
  const cartSore = useCartStore()
  const [category, setCategory] = useState(CATEGORIES[0])
  const [isScrollCategories, setIsScrollCategories] = useState(0)

  const sectionListRef = useRef<SectionList<ProductProps>>(null)
  const flatListRef = useRef<FlatList>(null)

  const cartQuantityItems = cartSore.products.reduce((total, product) => total + product.quantity, 0)

  function handleCategorySelect(selectedCategory: string) {
    setCategory(selectedCategory)
    setIsScrollCategories(1)

    const sectionIndex = CATEGORIES.findIndex(
      (category) => category === selectedCategory
    )

    if(sectionListRef.current) {
      sectionListRef.current.scrollToLocation({
        animated: true,
        sectionIndex,
        itemIndex: 0
      })
    }
  }

  const categoryIndex: any = {
    'Burguer 150g - Especial': 0,
    'Burguer 150g': 1,
    'Burguer 80g': 2,
    'Porções': 3,
    'Churros': 4,
    'Combo': 5,
    'Bebidas': 6,
  }

  const onViewableItemsChanged = ({ viewableItems }: any) => {
    if(isScrollCategories === 0){
      setCategory(viewableItems[0].section.title);
  
      if(flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true, 
          index: categoryIndex[viewableItems[0].section.title],
        })
      }
    } else {
      setIsScrollCategories(0)
    }
  };

  return (
    <View className="flex-1 pt-12">
      <Header title="Faça seu pedido" />

      <FlatList
        ref={flatListRef}
        data={CATEGORIES}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryButton
            title={item}
            isSelected={item === category}
            onPress={() => handleCategorySelect(item)} />
        )}
        horizontal
        className='max-h-10 mt-5 px-5'
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: 10, paddingRight: 40 }} 
      />
      
      <SectionList
        ref={sectionListRef}
        sections={MENU}
        keyExtractor={(item) => item.id}
        onViewableItemsChanged={onViewableItemsChanged}
        stickySectionHeadersEnabled={false}
        renderItem={({ item }) => (
          <Link href={`/product/${item.id}`} asChild>
            <Product data={item} />
          </Link>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className='text-xl text-white font-heading mt-8 mb-5'>{title}</Text>
        )}
        className='flex-1 p-5'
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  )
}