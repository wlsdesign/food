import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

type listProducts  = {
  id: string,
}
export const addFavorite = async (id: string): Promise<void> => {
  try {
    let favorites: string[] = [];
    const storedFavorites = await AsyncStorage.getItem('favorites');
    
    if (storedFavorites) {
      favorites = JSON.parse(storedFavorites);
    }

    const index = favorites.indexOf(id);
    if (index !== -1) {
      favorites.splice(index, 1);
    } else {
      favorites.push(id);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
  } catch (error) {
    console.error('Erro ao adicionar/remover dos favoritos:', error);
  }
};



// export const addFavorite = async (id: string): Promise<void> => {
//   // // AsyncStorage.removeItem('favorites')
//   const storedFavorites = await AsyncStorage.getItem('favorites');
//   // console.log('storedFavorites: ', JSON.parse(storedFavorites!))
//   try {
//     // Primeiro, recuperamos o array atual de favoritos do AsyncStorage
//     let favorites: string[] = [];
    
//     if (storedFavorites) {
//       favorites = JSON.parse(storedFavorites);
//     }
    
//     // Adicionamos o novo ID aos favoritos se ele ainda não estiver presente
//     if (!favorites.includes(id)) {
//       favorites.push(id);
//       // Salvamos o novo array de favoritos no AsyncStorage
//       await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
//       const storedFavorites = await AsyncStorage.getItem('favorites');
//       console.log('storedFavorites: ', JSON.parse(storedFavorites!))
//       console.log('ID adicionado aos favoritos:', id);
//     } else {
//       console.log('ID já está nos favoritos:', id);
//       const storedFavorites = await AsyncStorage.getItem('favorites');
//       console.log('storedFavorites: ', JSON.parse(storedFavorites!))
//     }
//   } catch (error) {
//     console.error('Erro ao adicionar aos favoritos:', error);
//   }
// };
// export async function addFavorite(id: string) {
//   let listProductId: string[] = []
//   listProductId.push(id)
//   const listFavorites = await AsyncStorage.getItem('favorites');
//   // listProductId = JSON.parse(listFavorites)

//   console.log('productId: ', [...listProductId, id])
//   // AsyncStorage.removeItem('favorites')
  
//   // if(listFavorites === null){
//   //   await AsyncStorage.setItem('favorites', JSON.stringify([id]))
//   // }else{
//   //   const newListFavorites = [...newListFavorites, listProductId]
//   //   await AsyncStorage.setItem('favorites', JSON.stringify([...listFavorites, {id: id}]))
//   // }
  
//   // console.log('listFavorites: ', listFavorites)
//   // listProductId.push({ id })
//   // await AsyncStorage.setItem('favorites', JSON.stringify(listProductId))
//   // const newListFavorites = JSON.parse(listFavorites!)
  
//   // // listProductId.push(newListFavorites)

//   // console.log('listProductId: ', newListFavorites)
  
//   // if(listFavorites === null){
//   // //   listProductId.push({ id })
//   // //   await AsyncStorage.setItem('favorites', JSON.stringify(listProductId))
//   // }else{
//   //   await AsyncStorage.setItem('favorites', JSON.stringify([...newListFavorites, listProductId]))
//   // //   listProductId.push(newListFavorites)
//   // //   await AsyncStorage.setItem('favorites', JSON.stringify(listProductId))
//   // //   console.log('listFavorites: ', JSON.parse(listFavorites))
//   // }
// }