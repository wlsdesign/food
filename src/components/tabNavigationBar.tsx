import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useCartStore } from '@/stores/cart-store'
import { Link } from "expo-router"
import { Feather } from '@expo/vector-icons';

export function TabNavigationBar() {
  const cartSore = useCartStore()

  const cartQuantityItems = cartSore.products.reduce((total, product) => total + product.quantity, 0)
  
  return (
    <View className='py-3 px-5 bg-white flex-row justify-between items-center'>
      <Link href="/" asChild>
        <TouchableOpacity className='justify-between items-center' activeOpacity={0.6}>
          <Feather name='home' size={24} />
          <Text className='text-md font-subTitle'>Home</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/favorites" asChild>
        <TouchableOpacity className='justify-between items-center' activeOpacity={0.6}>
          <Feather name='heart' size={24} />
          <Text className='text-md font-subTitle'>Favoritos</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/cart" asChild>
        <TouchableOpacity className="relative justify-between items-center" activeOpacity={0.7}>
          <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center absolute -top-2 z-10 right-2">
            <Text className="text-slate-900 font-bold text-xs">{cartQuantityItems}</Text>
          </View>

          <Feather name="shopping-cart" size={24} />
          <Text className='text-md font-subTitle'>Carrinho</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/favorites" asChild>
        <TouchableOpacity className='justify-between items-center' activeOpacity={0.6}>
          <Feather name='user' size={24} />
          <Text className='text-md font-subTitle'>Perfil</Text>
        </TouchableOpacity>
      </Link>
    </View>
  )
}