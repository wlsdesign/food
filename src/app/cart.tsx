import React, { useEffect, useState } from "react"
import { View, Text, ScrollView, Alert, Linking, TouchableOpacity } from "react-native"
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
import { SETTINGS } from "@/utils/settings/settings"
import { Dropdown } from "@/components/dropdown"
import Message from "@/components/toast-message"
import AsyncStorage from "@react-native-async-storage/async-storage"

const PHONE_NUMBER = '5512988276684'
// const PHONE_NUMBER = '5511992152000'

export default function Cart(){
  const [address, setAddress] = useState('')
  const [nameUser, setNameUser] = useState('')
  const [selected, setSelected] = React.useState(100);
  const [payment, setPayment] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [messageType, setMessageType] = React.useState('');
  const [messages, setMessages] = React.useState<string[]>([]);
  const cartStore = useCartStore()
  const navigation = useNavigation()

  function sumPriceToOrder(price: number = 0){
    const total = 
      cartStore.products.reduce(
        (total, product) => total + product.price * product.quantity,
        0
      )
    setAmount(total + price)
  }

  useEffect(() => {
    sumPriceToOrder();

    AsyncStorage.getItem('name-user', (err, value: any) => {
      if (err) {
        console.log('Error: ', err)
      } else {
        setNameUser(value)
      }
    })
  }, [])

  function handleProductRemove(product: ProductProps) {
    Alert.alert("Remover", `Deseja remover ${product.title} do carrinho?`, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Remover',
        onPress: () => {
          cartStore.remove(product.id)
          setMessages([...messages, `${product.title} removido do carrinho`]);
          setMessageType('success')
          setAmount(amount - product.price)
        }
      }
    ])
  }

  function handleOrder() {
    if(nameUser === ''){
      return Alert.alert('Obrigatório', 'Favor preencher seu nome.')
    }

    if(selected === 100){
      return Alert.alert('Obrigatório', 'Escolha o local da entrega.')
    }

    if(payment === ''){
      return Alert.alert('Obrigatório', 'Escolha a forma de pagamento.')
    }

    if(address.trim().length === 0 && selected !== 0){
      return Alert.alert('Pedido', 'Informe seu endereço de entrega.')
    }

    const products = cartStore.products.map((product) => `\n ${product.quantity} - ${product.title} \n \n ${product.comment && '*OBS:* ' + product.comment} \n -------------- \n`).join('')

    const message = `
    🍔 NOVO PEDIDO!
    \n *Responsável pelo pedido:* ${nameUser}
    \n 📍 *Entregar em:* ${address}

    📦 *Iten(s) do  Pedido:*
    ${products}
    \n 💰 *Valor total:* ${formatCurrency(amount)}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

    AsyncStorage.setItem(
      'name-user',
      nameUser,
    );
    cartStore.clear()
    navigation.goBack()
  }

  return (
    <View className="flex-1 pt-12">
      <View
        style={{
          position: 'absolute',
          top: 45,
          left: 0,
          right: 0,
        }}
      >
        {messages.map((message) => (
          <Message
            key={message}
            type={messageType}
            message={message}
            onHide={() => {
              setMessages((messages) =>
                messages.filter(
                  (currentMessage) =>
                    currentMessage !== message
                )
              );
            }}
          />
        ))}
      </View>

      <Header title="Seu carrinho" />
      <KeyboardAwareScrollView>
        <ScrollView>
          {cartStore.products.length > 0 ? (
            <View className="p-5">
              <View className="">
                {cartStore.products.map((product) => (
                  <View key={product.id} className="flex-row justify-around items-center gap-2">
                    <Product
                      data={product}
                      activeOpacity={1}
                    />
                    <TouchableOpacity onPress={() => handleProductRemove(product)}>
                      <Feather name="trash-2" size={20} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>

              <Input 
                  placeholder="Digite seu nome"
                  onChangeText={setNameUser}
                  className="mb-4 h-12"
                  value={nameUser}
                />

              <Dropdown
                setSelected={(val: React.SetStateAction<number>) => {
                  setSelected(val)
                }}
                onSelect={() => sumPriceToOrder(selected)}
                data={SETTINGS.neighborhood} 
                save="key"
                placeholder="Escolha o bairro para a entrega"
              />

              <Dropdown
                setSelected={(val: React.SetStateAction<string>) => {
                  setPayment(val)
                }} 
                data={SETTINGS.paymentType} 
                save="value"
                placeholder="Escolha o método de pagamento"
              />

              <View className="flex-row gap-2 items-center mt-2 mb-4">
                <Text className="text-white text-xl font-subTitle">Total: </Text>
                <Text className="text-lime-400 text-2xl font-heading">{formatCurrency(amount)}</Text>
              </View>

              {selected !== 100 && selected !== 0 && payment !== '' &&
                <Input 
                  placeholder="Informe seu endereço de entrega com rua, bairro, CEP, número e complemento..."
                  onChangeText={setAddress}
                  blurOnSubmit={true}
                  onSubmitEditing={handleOrder}
                  returnKeyType="send"
                  className="mb-4"
                />
              }

              <View className="gap-5">
                <Button onPress={handleOrder} className="rounded-md">
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