import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header } from '@/components/header';
import { PRODUCTS, ProductProps } from '@/utils/data/products';
import { FontAwesome } from '@expo/vector-icons';
import { Link } from 'expo-router'
import { LinkButton } from '@/components/link-button';
import { RemoveFavorite } from '@/utils/functions/remove-favorite';

export default function Cart() {
  const [favorites, setFavorites] = useState<ProductProps[]>([]);

  function handleRemoveFavorite(id: any){
    const favoritesList = favorites.filter((item) => item.id !== id);
    setFavorites(favoritesList)
    RemoveFavorite(id)
  }

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const value = await AsyncStorage.getItem('favorites');
        if (value !== null) {
          const favoriteIds = JSON.parse(value);
          const favoriteProducts = PRODUCTS.filter(product => favoriteIds.includes(product.id));
          setFavorites(favoriteProducts);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: 48 }}>
      <Header title='Favoritos' />

      <View className='gap-2 mx-5 mt-2'>
        <ScrollView>
          {favorites.length > 0 ? (
            favorites.map((favorite) => (
              <View key={favorite.id} className="flex-row justify-between items-center">
                <Link href={`/product/${favorite.id}`} className='bg-red w' asChild>
                  <TouchableOpacity className='flex-row justify-between items-center py-3 border-b border-slate-700 w-10/12 pr-3' activeOpacity={1}>
                    <Image source={{ uri: favorite.thumbnail }} className="w-20 h-20 rounded-md mr-4" />
  
                    <View className='gap-1 flex-1'>
                      <Text className='font-heading text-white'>{favorite.title}</Text>
                      <Text className='text-slate-400'>{favorite.description}</Text>
                    </View>
                  </TouchableOpacity>
                </Link>
  
                <TouchableOpacity onPress={() => handleRemoveFavorite(favorite.id)}>
                  <FontAwesome name="heart" size={32} color="#f00" />
                </TouchableOpacity>
              </View>
            ))
          ):(
            <View>
              <Text className="font-body text-slate-400 text-center my-8">
                Você não tem nenhum favorito.
              </Text>
              <LinkButton title="Voltar ao cardápio" href="/" />
            </View>
          )
        }
        </ScrollView>
      </View>
    </View>
  );
}