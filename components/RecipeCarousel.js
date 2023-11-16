import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from "react-native";
import FlipCard from "react-native-flip-card";
import { FontAwesome5 } from "@expo/vector-icons";

export default function RecipeCarousel({ recipeArray }) {
  const { width, height } = Dimensions.get("screen");
  const filteredArray = [];
  recipeArray.map((recipe, index) => {
    if (recipe.allergens.includes("Fish" || "Crustaceans" || "Eggs")) {
      filteredArray.push(recipe);
    }
  });

  return (
    <View style={{ height: height / 1.6 }}>
      <FlatList
        data={recipeArray}
        keyExtractor={(item) => item.id}
        horizontal={true}
        renderItem={({ item }) => {
          const {
            shortDescription,
            name,
            cookingTime,
            chilli,
            averageRating,
            topReview,
          } = item;

          return (
            <FlipCard
              style={{
                width: width / 1.2,
                height: height / 0.2,
                ...styles.cardContainer,
              }}
              flipHorizontal={true}
              flipVertical={false}
              useNativeDriver={true}
            >
              {/* Front of card */}
              <View
                style={{ flex: 1, margin: 5, padding: 5, alignSelf: "center" }}
              >
                <Text style={styles.heading}>{name}</Text>
                <Text style={styles.bodyText}>{shortDescription}</Text>
                <Image
                  source={{
                    uri: item.imageTall,
                  }}
                  style={{
                    width: width / 1.4,
                    height: height / 2.6,
                    alignSelf: "center",
                  }}
                />
              </View>
              {/* Back of card */}
              <View
                style={{
                  flex: 1,
                  margin: 5,
                  padding: 5,
                  alignSelf: "center",
                  justifyContent: "space-around",
                  // alignItems:''
                }}
              >
                <Text style={styles.cardText}>
                  Cooking time: {cookingTime} minutes
                </Text>
                <Text style={styles.cardText}>
                  Averange Rating: {averageRating}
                </Text>
                <Text style={styles.cardText}>Top Review: {topReview}</Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 5,
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      marginRight: 5,
                      ...styles.cardText,
                    }}
                  >
                    Spice rating:
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                    }}
                  >
                    {chilli &&
                      Array(chilli)
                        .fill()
                        .map((_, index) => (
                          <FontAwesome5
                            name="pepper-hot"
                            size={24}
                            color="red"
                            key={index}
                          />
                        ))}
                  </View>
                </View>
              </View>
            </FlipCard>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    textAlign: "center",
    paddingVertical: 3,
  },
  bodyText: {
    paddingVertical: 5,
    textAlign: "center",
    fontSize: 16,
  },
  cardContainer: {
    flexDirection: "column",
    backgroundColor: "white",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderWidth: 2,
    marginHorizontal: 5,
    borderColor: "green",
    borderRadius: 10,
    borderWidth: 3,
  },
  cardText: {
    paddingVertical: 5,
    textAlign: "center",
    fontSize: 18,
  },
});
