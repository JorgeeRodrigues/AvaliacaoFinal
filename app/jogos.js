import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TextInput,
  FlatList,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { useState, useEffect } from "react";

const API_URL = "http://177.44.248.50:8080";

// CRIAR
async function criarJogo(title, description, platform, price) {
  const slug = title.toLowerCase().replace(/\s+/g, "-");

  const corpo = {
    title,
    slug,
    description: description || "sem descricao",
    developer: "desconhecido",
    publisher: "desconhecido",
    genre: "N/A",
    platform,
    release_date: "2000-01-01",
    price: Number(price),
  };

  const resposta = await fetch(`${API_URL}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });

  if (resposta.ok) return await resposta.json();
  return null;
}

// LISTAR
async function listarJogos() {
  const r = await fetch(`${API_URL}/games`);
  if (r.ok) return await r.json();
  return [];
}

// EXCLUIR
async function excluirJogo(id) {
  await fetch(`${API_URL}/games/${id}`, { method: "DELETE" });
}

// EDITAR
async function atualizarJogo(id, title, description, platform, price) {
  const corpo = {
    title,
    description,
    platform,
    price: Number(price),
  };

  await fetch(`${API_URL}/games/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo),
  });
}

export default function Games() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [preco, setPreco] = useState("");
  const [lista, setLista] = useState([]);

  const [editandoId, setEditandoId] = useState(null);

  function limpar() {
    setNome("");
    setDescricao("");
    setPlataforma("");
    setPreco("");
    setEditandoId(null);
  }

  async function carregar() {
    const dados = await listarJogos();
    setLista(dados);
  }

  useEffect(() => {
    carregar();
  }, []);

  async function salvar() {
    if (!nome || !descricao || !preco || !plataforma) return;

    // Se está editando, atualiza
    if (editandoId !== null) {
      await atualizarJogo(editandoId, nome, descricao, plataforma, preco);
      limpar();
      carregar();
      return;
    }

    // Se não está editando, cria
    await criarJogo(nome, descricao, plataforma, preco);

    limpar();
    carregar();
  }

  function editar(jogo) {
    setNome(jogo.title);
    setDescricao(jogo.description);
    setPlataforma(jogo.platform);
    setPreco(jogo.price.toString());
    setEditandoId(jogo.id);
  }

  async function deletar(id) {
    await excluirJogo(id);
    carregar();
  }

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>🎮 Cadastro de Jogos</Text>

      {/* Inputs estilizados */}
      <View style={{ gap: 10 }}>
        <TextInput
          placeholder="Título"
          value={nome}
          onChangeText={setNome}
          style={estilos.input}
        />

        <TextInput
          placeholder="Gênero"
          value={descricao}
          onChangeText={setDescricao}
          multiline
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
          value={preco}
          onChangeText={setPreco}
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
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 25 }}
        renderItem={({ item }) => (
          <View style={estilos.card}>
            <Text style={estilos.tituloCard}>{item.title}</Text>
            <Text>🎯 Gênero: {item.platform}</Text>
            <Text>🕹 Plataforma:  {item.price}</Text>
            <Text>📅 Ano de lançamento:  {item.price}</Text>
            

            <View style={estilos.botoes}>
              <TouchableOpacity onPress={() => editar(item)}>
                <Text style={{ color: "blue", fontWeight: "bold" }}>
                  Editar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deletar(item.id)}>
                <Text style={{ color: "red", fontWeight: "bold" }}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#AAA",
    padding: 10,
    borderRadius: 18,
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
});
