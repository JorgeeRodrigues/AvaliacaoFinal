import { View, Text, Button, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Gerenciador de Jogos</Text>

      <View style={{ width: "80%" }}>
        <Link href="/jogos" asChild>
          <Button title="Tela de cadastro de jogos" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 25,
    alignItems: "center",
    gap: 25,
    backgroundColor: "#f0f4ff",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
