import AsyncStorage from "@react-native-async-storage/async-storage";

export const RemoveFavorite = async (itemToRemove: string) => {
  try {
    const oldArray = await AsyncStorage.getItem('favorites');

    if (oldArray !== null) {
      const arrayJavaScript = JSON.parse(oldArray);

      const newArray = arrayJavaScript.filter((item: string) => item !== itemToRemove);

      await AsyncStorage.setItem('favorites', JSON.stringify(newArray));
    }
  } catch (error) {
    console.error('Erro ao remover produto: ', error);
  }
};