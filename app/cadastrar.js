import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function Cadastrar() {
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [ano, setAno] = useState("");
  const [jogos, setJogos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);

  function limpar() {
    setTitulo("");
    setGenero("");
    setPlataforma("");
    setAno("");
    setEditandoId(null);
  }

  function salvar() {
    if (!titulo || !genero || !plataforma) {
      alert("Preencha título, gênero e plataforma.");
      return;
    }

    // Editar jogo existente
    if (editandoId !== null) {
      setJogos((lista) =>
        lista.map((jogo) =>
          jogo.id === editandoId
            ? { ...jogo, titulo, genero, plataforma, ano }
            : jogo
        )
      );
      limpar();
      return;
    }

    // Cadastrar novo
    const novo = {
      id: Date.now(),
      titulo,
      genero,
      plataforma,
      ano,
    };

    setJogos((lista) => [...lista, novo]);
    limpar();
  }

  function editar(jogo) {
    setTitulo(jogo.titulo);
    setGenero(jogo.genero);
    setPlataforma(jogo.plataforma);
    setAno(jogo.ano);
    setEditandoId(jogo.id);
  }

  function excluir(id) {
    setJogos((lista) => lista.filter((jogo) => jogo.id !== id));
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        🎮 Cadastro de Jogos
      </Text>

      {/* Inputs */}
      <View style={{ gap: 10 }}>
        <TextInput
          placeholder="Título"
          value={titulo}
          onChangeText={setTitulo}
          style={estilos.input}
        />
        <TextInput
          placeholder="Gênero"
          value={genero}
          onChangeText={setGenero}
          style={estilos.input}
        />
        <TextInput
          placeholder="Plataforma"
          value={plataforma}
          onChangeText={setPlataforma}
          style={estilos.input}
        />
        <TextInput
          placeholder="Ano de lançamento"
          value={ano}
          onChangeText={setAno}
          keyboardType="numeric"
          style={estilos.input}
        />
        <Button
          title={editandoId ? "Salvar Alterações" : "Cadastrar"}
          onPress={salvar}
        />
      </View>

      {/* Lista */}
      <FlatList
        data={jogos}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 25 }}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <Text style={estilos.tituloCard}>{item.titulo}</Text>
            <Text>🎯 Gênero: {item.genero}</Text>
            <Text>🕹 Plataforma: {item.plataforma}</Text>
            <Text>📅 Ano: {item.ano || "Não informado"}</Text>

            <View style={estilos.botoes}>
              <TouchableOpacity onPress={() => editar(item)}>
                <Text style={{ color: "blue", fontWeight: "bold" }}>Editar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => excluir(item.id)}>
                <Text style={{ color: "red", fontWeight: "bold" }}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const estilos = {
  input: {
    borderWidth: 1,
    borderColor: "#AAA",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  card: {
    padding: 14,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 10,
    marginBottom: 12,
    backgroundColor: "#F8F8F8",
  },
  tituloCard: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  botoes: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },
};
