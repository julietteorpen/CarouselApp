import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import RecipeCarousel from "./components/RecipeCarousel";

export default function App() {
  const url = "https://www.simplycook.com/api/recipes";
  const [loading, setLoading] = useState(true);
  const [recipeArray, setRecipeArray] = useState([]);
  const recipeData = () => {
    return fetch(url)
      .then((resp) => resp.json())
      .then((json) => setRecipeArray(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    recipeData();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <Text style={{ margin: "20%", ...styles.bigBoldHeading }}>
        Simply Cook
      </Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <RecipeCarousel recipeArray={recipeArray} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  bigBoldHeading: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
