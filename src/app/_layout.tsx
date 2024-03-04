import { SafeAreaView, View, Text } from 'react-native'
import {Slot} from 'expo-router'
import React, { useEffect, useState } from 'react'
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter'

import { Loading } from "@/components/loading"
import { ProductProps } from '@/utils/data/products'

type apiStoreProps = {
  "menu": ProductProps[]
  "config": {
    "phone_number": string,
    "on_time_payment": boolean,
    "message_to_update": boolean
  }
}

export default function Layout(){
  const [apiStore, setApiStore] = useState<apiStoreProps>()
  const [isLoading, setIsLoading] = useState(true)

  const [fontsLoaded] = useFonts({
    Inter_400Regular, 
    Inter_500Medium, 
    Inter_600SemiBold, 
    Inter_700Bold
  })

  const getApiStore = async () => {
    await fetch('https://db-delivery.vercel.app/stores')
      .then(response => response.json())
      .then((data) => {
        setApiStore(data['thiagao-burguer'])
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getApiStore()
  }, [])

  if(!fontsLoaded){
    return <Loading />
  }

  return (
  <SafeAreaView className="flex-1 bg-slate-900">
    {isLoading && 
      <Loading />
    }
    
    {apiStore !== undefined && !apiStore?.config.on_time_payment &&
      <>
        <View className='absolute top-0 left-0 right-0 bottom-0 bg-white z-50 items-center justify-center p-5 gap-2'>
          <Text className='text-slate-950 text-5xl'>Desculpe!</Text>
          <Text className='text-slate-950 text-3xl text-center'>Nosso aplicativo está em manutenção</Text>
        </View>
      </>
    }

    {!isLoading &&
      <Slot />
    }

  </SafeAreaView>
  )
}