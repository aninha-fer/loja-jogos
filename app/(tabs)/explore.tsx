import Card from '@/components/card';
import CarrosselCategorias from '@/components/carrossel-categorias';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');

  useEffect(() => {
    if (categoria) {
      setCategoriaSelecionada(categoria.toString());
    }
  }, [categoria]);

  const categorias = ['Todos','Ação', 'RPG', 'Estratégia', 'Terror', 'Aventura', 'Simulação', 'Esporte', 'Corrida', 'Puzzle'];

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

      <CarrosselCategorias categorias={categorias} selecionavel={true}/>

      <View style={styles.grid}>
        {jogosFiltrados.map((item) => (
          <Card key={item.id} jogo={item}/>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    display: 'flex',
    marginLeft: 20,
    marginRight: 20,
    rowGap: 20,
  },
});