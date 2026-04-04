import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import { useLocalSearchParams } from 'expo-router';

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  useEffect(() => {
    if (categoria) {
      setCategoriaSelecionada(categoria.toString());
    }
  }, [categoria]);

  const categorias = ['Todos', 'Aventura', 'Ação', 'Esporte'];

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

  const jogosFiltrados =
    categoriaSelecionada === 'Todos'
      ? jogos
      : jogos.filter((jogo) => jogo.categoria === categoriaSelecionada);

  return (
    <ScrollView style={styles.container}>

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

      {/* GRID FLEX */}
      <View style={styles.grid}>
        {jogosFiltrados.map((item) => (
          <View key={item.id} style={styles.card}>

            <Image
              source={{ uri: item.imagem }}
              style={styles.imagem}
              contentFit="cover"
            />

            <View style={styles.cardInfo}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.preco}>{item.preco}</Text>
              <Text style={styles.categoria}>{item.categoria}</Text>
            </View>

          </View>
        ))}
      </View>

    </ScrollView>
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

  // 🔥 GRID FLEX (igual web)
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },

  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    elevation: 3
  },

  imagem: {
    width: '100%',
    height: 120
  },

  cardInfo: {
    padding: 10
  },

  titulo: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5
  },

  preco: {
    fontSize: 13,
    color: '#007bff',
    fontWeight: 'bold'
  },

  categoria: {
    fontSize: 12,
    color: '#777',
    marginTop: 3
  }
});