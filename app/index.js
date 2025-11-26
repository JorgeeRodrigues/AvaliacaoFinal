import { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>

      <Image
        source={{
          uri: "https://imgs.search.brave.com/LHbdsI91c0YoYj1PUIi3eEPZXv3jBvxuPVIdCf8kROM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cG5nbWFydC5jb20v/ZmlsZXMvMjIvRW1v/amktTWVtZS1QTkct/Q2xpcGFydC5wbmc",
        }}
        style={styles.logo}
        resizeMode="contain"
      />

      <Link href="/jogos" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tela de cadastro de jogos</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f4ff",
  },

  logo: {
    width: 260,
    height: 260,
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#3b6ef6",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
  },

  buttonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
  },
});
