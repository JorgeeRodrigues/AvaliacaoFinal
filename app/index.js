import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 25,
        alignItems: "center",
        gap: 25,
      }}
    >
      <Text
        style={{
          fontSize: 30,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        🎮 Gerenciador de Jogos
      </Text>

      <View style={{ width: "80%" }}>
        <Link href="/cadastrar" asChild>
          <Button title="Cadastrar e Listar Jogos" />
        </Link>
      </View>
    </View>
  );
}
