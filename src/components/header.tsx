import React, { useEffect, useState } from "react"
import { Image, Text, TouchableOpacity, View } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Link } from "expo-router"

type HeaderProps = {
  title: string,
}

export function Header({ title }: HeaderProps) {
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
        <Link href='/' asChild>
          <TouchableOpacity activeOpacity={1}>
            <Image source={require('@/assets/logo-small.png')} className="h-20 w-20 rounded-full border-solid border-slate-50 border-2" />
          </TouchableOpacity>
        </Link>

        <View className="gap-1">
          <Text className="text-slate-400 text-base font-heading">{`${userName !== null ? 'Olá, ' + userName : 'Olá!'}`}</Text>
          <Text className="text-white text-xl font-heading">{title}</Text>
        </View>
      </View>
    </View>
  )
}