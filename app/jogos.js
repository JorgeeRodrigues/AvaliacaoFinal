import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Text, TextInput, FlatList, View, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

const API_URL = "http://177.44.248.50:8080";

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
    price: Number(price)
  };

  const resposta = await fetch(`${API_URL}/games`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(corpo)
  });

  if (resposta.ok) return await resposta.json();
  return null;
}

async function listarJogos() {
  const r = await fetch(`${API_URL}/games`);
  if (r.ok) return await r.json();
  return [];
}

async function excluirJogo(id) {
  await fetch(`${API_URL}/games/${id}`, { method: "DELETE" });
}

export default function Games() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [plataforma, setPlataforma] = useState("");
  const [preco, setPreco] = useState("");
  const [lista, setLista] = useState([]);

  async function carregar() {
    const dados = await listarJogos();
    setLista(dados);
  }

  async function salvar() {
    if (!nome || !descricao || !preco || !plataforma) return;

    await criarJogo(nome, descricao, plataforma, preco);

    setNome("");
    setDescricao("");
    setPlataforma("");
    setPreco("");

    carregar();
  }

  async function deletar(id) {
    await excluirJogo(id);
    carregar();
  }

  useEffect(() => {
    carregar();
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.titulo}>Cadastro de Jogos</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={estilos.input}
      />

      <TextInput
        placeholder="Descrição"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        style={[estilos.input, { height: 80 }]}
      />

      <TextInput
        placeholder="Plataforma"
        value={plataforma}
        onChangeText={setPlataforma}
        style={estilos.input}
      />

      <TextInput
        placeholder="Preço"
        value={preco}
        onChangeText={setPreco}
        keyboardType="numeric"
        style={estilos.input}
      />

      <View style={estilos.botoesLinha}>
        <TouchableOpacity style={estilos.btn} onPress={salvar}>
          <Text style={estilos.btnTexto}>Salvar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={estilos.btn} onPress={carregar}>
          <Text style={estilos.btnTexto}>Atualizar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={estilos.item}>
            <View style={{ flex: 1 }}>
              <Text style={estilos.itemNome}>{item.title}</Text>
              <Text style={estilos.itemTexto}>R$ {item.price}</Text>
              <Text style={estilos.itemTexto}>Plataforma: {item.platform}</Text>
              {item.description ? (
                <Text style={estilos.itemTexto}>Descrição: {item.description}</Text>
              ) : null}
            </View>

            <TouchableOpacity
              onPress={() => deletar(item.id)}
              style={estilos.botaoExcluir}
            >
              <Text style={estilos.excluirTexto}>X</Text>
            </TouchableOpacity>
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
    backgroundColor: "#f2f2f2"
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc"
  },
  botoesLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15
  },
  btn: {
    flex: 1,
    backgroundColor: "#0080ff",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5
  },
  btnTexto: {
    color: "#fff",
    fontWeight: "bold"
  },
  item: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  itemNome: {
    fontSize: 17,
    fontWeight: "bold",
    marginBottom: 3
  },
  itemTexto: {
    fontSize: 14
  },
  botaoExcluir: {
    width: 35,
    height: 35,
    backgroundColor: "#0080ff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10
  },
  excluirTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold"
  }
});
