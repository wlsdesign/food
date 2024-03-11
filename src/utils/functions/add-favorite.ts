import AsyncStorage from "@react-native-async-storage/async-storage";

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