import React, { useEffect, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import { Feather } from "@expo/vector-icons"
import { Link } from "expo-router"
import colors from "tailwindcss/colors"
import AsyncStorage from "@react-native-async-storage/async-storage"

type HeaderProps = {
  title: string,
  cartQuantityItems?: number
}

export function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
  const [userName, setUserName] = useState('')

  useEffect(() => {
    AsyncStorage.getItem('name-user', (err, value: any) => {
      if (err) {
        console.log('Error: ', err)
      } else {
        setUserName(value)
      }
    })
  }, [])

  return (
    <View className="flex-row items-center border-b border-slate-700 pb-2 mx-5 justify-between">
      <View className="flex-row items-center gap-x-2">
        <Image source={require('@/assets/logo-small.png')} className="h-20 w-20 rounded-full border-solid border-slate-50 border-2" />
        <View className="gap-1">
          <Text className="text-slate-400 text-base font-heading">{`${userName !== null ? 'Olá, ' + userName : 'Olá!'}`}</Text>
          <Text className="text-white text-xl font-heading">{title}</Text>
        </View>
      </View>

      {cartQuantityItems > 0 &&
        <Link href="/cart" asChild>
          <TouchableOpacity className="relative" activeOpacity={0.7}>
            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
              <Text className="text-slate-900 font-bold text-xs">{cartQuantityItems}</Text>
            </View>

            <Feather name="shopping-bag" color={colors.white} size={24} />
          </TouchableOpacity>
        </Link>
      }
    </View>
  )
}