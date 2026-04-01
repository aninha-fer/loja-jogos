import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export default function App() {

  const jogos = [
    { 
      id: '1', 
      titulo: 'Minecraft', 
      preco: 'R$ 199,90', 
      categoria: 'Aventura',
      imagem: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6DKnP8m8EHbfT7f5L6ixqAvHiHQxxhFtkZg&s'
    },
    { 
      id: '2',
      titulo: 'FIFA 24',
      preco: 'R$ 299,90',
      categoria: 'Esporte',
      imagem: 'https://www.centralxbox.com.br/wp-content/uploads/2023/10/f1.jpeg'
    },
    { 
      id: '3',
      titulo: 'Call of Duty',
      preco: 'R$ 249,90',
      categoria: 'Ação',
      imagem: 'https://upload.wikimedia.org/wikipedia/pt/8/8b/Call_of_Duty_Modern_Warfare_3_capa.png'
    }
  ];

  const categorias = ['Todos', 'Ação', 'Esporte', 'Aventura'];

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  const jogosFiltrados =
    categoriaSelecionada === 'Todos'
      ? jogos
      : jogos.filter(jogo => jogo.categoria === categoriaSelecionada);

  return (
    <View style={styles.container}>

      <View style={styles.categorias}>
        {categorias.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[
              styles.botao,
              categoriaSelecionada === cat && styles.botaoAtivo
            ]}
            onPress={() => setCategoriaSelecionada(cat)}
          >
            <Text
              style={{
                color: categoriaSelecionada === cat ? '#fff' : '#000'
              }}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={jogosFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>

            <Image
              source={{ uri: item.imagem }}
              style={styles.imagem}
              contentFit="cover"
            />

            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text>{item.preco}</Text>
            <Text style={styles.categoria}>{item.categoria}</Text>

          </View>
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 40
  },

  categorias: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20
  },

  botao: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 20
  },

  botaoAtivo: {
    backgroundColor: '#007bff'
  },

  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },

  imagem: {
    width: '100%',
    height: 140,
    borderRadius: 10,
    marginBottom: 10
  },

  titulo: {
    fontSize: 18,
    fontWeight: 'bold'
  },

  categoria: {
    marginTop: 5,
    fontStyle: 'italic'
  }
});