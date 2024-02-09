import React, { useState } from "react"
import { View, Text, ScrollView, Alert, Linking } from "react-native"
import { useNavigation } from "expo-router"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"

import { useCartStore } from "@/stores/cart-store"

import { Header } from "@/components/header"
import { Product } from "@/components/product"
import { formatCurrency } from "@/utils/functions/format-currency"
import { Input } from "@/components/input"
import { Button } from "@/components/button"
import { Feather } from "@expo/vector-icons"
import { LinkButton } from "@/components/link-button"
import { ProductProps } from "@/utils/data/products"

// const PHONE_NUMBER = '5521970176922'
const PHONE_NUMBER = '5511992152000'

export default function Cart(){
  const [address, setAddress] = useState('')
  const cartStore = useCartStore()
  const navigation = useNavigation()

  const total = formatCurrency(
    cartStore.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  )

  function handleProductRemove(product: ProductProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => cartStore.remove(product.id)
      }
    ])
  }

  function handleOrder() {
    if(address.trim().length === 0){
      return Alert.alert('Pedido', 'Informe os dados da entrega.')
    }

    const products = cartStore.products.map((product) => `\n ${product.quantity} ${product.title}`).join('')

    const message = `
    🍔 NOVO PEDIDO
    \n Entregar em: ${address}

    ${products}

    \n Valor total: ${total}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

    cartStore.clear()
    navigation.goBack()
  }

  return (
      <View className="flex-1 pt-8">
      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          {cartStore.products.length > 0 ? (
            <View className="p-5">
              <View className="">
                {cartStore.products.map((product) => (
                  <Product
                    key={product.id}
                    data={product}
                    onPress={() => handleProductRemove(product)} />
                ))}
              </View>

              <View className="flex-row gap-2 items-center mt-2 mb-4">
                <Text className="text-white text-xl font-subTitle">Total: </Text>
                <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
              </View>

              <Input 
                placeholder="Informe seu endereço de entrega com rua, bairro, CEP, número e complemento..."
                onChangeText={setAddress}
                blurOnSubmit={true}
                onSubmitEditing={handleOrder}
                returnKeyType="send"
              />
              <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                  <Button.Text>Enviar Pedido</Button.Text>
                  <Button.Icon>
                    <Feather name="arrow-right-circle" size={20} />
                  </Button.Icon>
                </Button>

                <LinkButton title="Voltar ao cardápio" href="/" />
              </View>
            </View>
          ) : (
            <View>
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho está vazio.
              </Text>
              <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
          )}
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  )
}