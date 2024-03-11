import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";

import { useCartStore } from "@/stores/cart-store";

import { useLocalSearchParams, useNavigation, Redirect } from "expo-router";

import { PRODUCTS } from "@/utils/data/products";
import { formatCurrency } from "@/utils/functions/format-currency";

import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { addFavorite } from "@/utils/functions/add-favorite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Product() {
  const [comment, setComment] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const cartStore = useCartStore()
  const navigation = useNavigation();
  const { id } = useLocalSearchParams()

  const product = PRODUCTS.find((item) => item.id === id)!
  const isDisableButton = quantity > 1 ? false : true

  function handleAddToFavorite(){
    setIsFavorite(!isFavorite)
    addFavorite(product.id)
  }

  function handleAddToCart() {
    cartStore.add(product!, comment, quantity)
    navigation.goBack()
  }

  function handleIncrementOrder() {
    setQuantity(quantity + 1);
  }

  function handleDecrementOrder() {
    setQuantity(quantity - 1);
  }

  useEffect(() => {
    AsyncStorage.getItem('favorites', (err, value: any) => {
      if (err) {
        console.log('Error: ', err)
      } else {
        if(value?.includes(product.id)){
          setIsFavorite(true)
        }else{
          setIsFavorite(false)
        }
      }
    })
  }, [])

  if(!product){
    return <Redirect href="/" />
  }
  
  return (
    <View className="flex-1 relative">
      <Image source={{ uri: product.cover}} className="w-full h-52 border-0" resizeMode="cover" />

      <TouchableOpacity
        className="absolute top-10 left-5 w-10 h-10 bg-white rounded-full items-center justify-center"
        activeOpacity={1}
        onPress={navigation.goBack}
      >
        <View className="w-3 h-3 border-lime-600 border-l-2 border-b-2 ml-1 rotate-45"></View>
      </TouchableOpacity>

      <TouchableOpacity
        className="absolute top-10 right-5 w-10 h-10 items-center justify-center"
        activeOpacity={1}
        onPress={handleAddToFavorite}
      >
        <FontAwesome
          name={`${isFavorite ? 'heart' : 'heart-o'}`}
          size={32}
          color={`${isFavorite ? '#f00' : '#fff'}`}
          solid
          style={{
            shadowOpacity: 2,
            textShadowRadius: 2,
            textShadowOffset: {width: 1, height: 1},
          }}
        />
      </TouchableOpacity>

      <KeyboardAwareScrollView>
        <View className="p-5 mt-1 flex-1">
          <Text className="text-white font-heading text-xl">
            {product.title}
          </Text>

          <Text className="text-lime-400 text-2xl font-heading my-2">
            {formatCurrency(product.price)}
          </Text>

          <Text className="text-slate-400 font-body text-base leading-6 mb-6">
            {product.description}
          </Text>

          <View className="mt-4">
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-white text-lg font-base">📝 Alguma observação?</Text>
              <Text className="text-slate-100">{`${comment.length}/140`}</Text>
            </View>

            <Input 
              placeholder="Ex: tirar a cebola, maionese à parte etc."
              onChangeText={setComment}
              blurOnSubmit={true}
              returnKeyType="send"
              maxLength={140}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View className="p-5 pb-8 gap-4 flex-row items-center justify-around">
        <View className="flex-row gap-5">
          <TouchableOpacity activeOpacity={1} disabled={isDisableButton} className="h-10" onPress={handleDecrementOrder}>
            <Feather name="minus" color={`${quantity > 1 ? 'white' : 'gray'}`} size={20} />
          </TouchableOpacity>

          <Text className="text-lime-500">{quantity}</Text>

          <TouchableOpacity activeOpacity={1} onPress={handleIncrementOrder}>
            <Feather name="plus" color="white" size={20} />
          </TouchableOpacity>
        </View>

        <Button onPress={handleAddToCart} className="rounded-md px-3 w-56">
          <Button.Icon>
            <Feather name="plus-circle" size={20} />
          </Button.Icon>

          <Button.Text>Adicionar</Button.Text>
        </Button>
      </View>
    </View>
  )
}