import Card from '@/components/card';
import CarrosselCategorias from '@/components/carrossel-categorias';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

type Jogo = {
  id: number;
  titulo: string;
  descricao: string;
  preco: number;
  genero: string;
  dataLancamento: string;
  tamanho: number;
  capa: string;
  idadeMinima: number;
};

export default function CategoriaScreen() {
  const { categoria } = useLocalSearchParams();
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [jogos, setJogos] = useState<Jogo[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://projeto-steam.vercel.app/jogos');
        setJogos(response.data); 
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (categoria) {
      setCategoriaSelecionada(categoria.toString());
    }
  }, [categoria]);

  const categorias = ['Todos', 'acao', 'RPG', 'sobrevivencia', 'aventura', 'esporte'];

  const jogosFiltrados =
    categoriaSelecionada === 'Todos'
      ? jogos
      : jogos.filter((jogo) => jogo.genero === categoriaSelecionada);

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