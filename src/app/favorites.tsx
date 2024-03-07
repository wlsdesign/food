import { Header } from '@/components/header';
import React from 'react';
import { Text, View } from 'react-native';

// import { Container } from './styles';

export default function Cart(){
  return (
    <View className='flex-1 pt-12'>
      <Header title='Favoritos' />
    </View>
  )
}