import { formatCurrency } from "@/utils/functions/format-currency";
import React, { forwardRef } from "react";
import { Image, TouchableOpacity, TouchableOpacityProps, View, Text } from "react-native";

type ProductDataProps = {
  title: string
  description: string
  thumbnail: string
  quantity?: number
  price?: number
}

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps
}

export const Product = forwardRef<TouchableOpacity, ProductProps>(({ data,  ...rest}, ref) => {
  return (
    <TouchableOpacity ref={ref} className="w-full flex-row items-center pb-4 border-b-2 border-slate-800 mb-5" {...rest}>
      <Image source={{ uri: data.thumbnail }} className="w-20 h-20 rounded-md" />

      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-slate-100 font-subtitle text-base">{data.title}</Text>
          {data.quantity && (
            <Text className="text-slate-400 font-subTitle text-sm">x {data.quantity}</Text>  
          )}
        </View>
        <Text className="text-slate-400 text-xs leading-5 mt-0.5">{data.description}</Text>

        {data.price && (
          <Text className="text-lime-400 text-xs font-heading my-2">
          {formatCurrency(data.price)}
        </Text>
      )}
      </View>
    </TouchableOpacity>
  )
})