import CardFavoritos from '@/components/card-favoritos';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

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

export default function FavoritosScreen() {
  const colorScheme = useColorScheme();
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [jogo, setJogo] = useState<Jogo[]>([]);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const response = await axios.get('https://projeto-steam.vercel.app/favoritos');
          const favoritosObj = response.data;
          const favoritosArray = Object.values(favoritosObj).flat() as { titulo: string }[];
          if (Array.isArray(favoritosArray)) {
            setFavoritos(favoritosArray.map(f => f.titulo));
          } else {
            console.error('favoritos não é array:', favoritosArray);
          }
        } catch (error) {
          console.error('Erro ao buscar favoritos:', error);
        }
      }
      fetchData();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        try {
          const response = await axios.get('https://projeto-steam.vercel.app/jogos');
          setJogo(response.data); 
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, [])
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background, flex: 1 }]}
      contentContainerStyle={{ paddingBottom: 100 }}
    >
      <View style={styles.header}>
        <Text style={styles.titulo}>Meus Favoritos</Text>
        <Text style={styles.subtitulo}>{favoritos.length} JOGOS SALVOS</Text>
      </View>

      <View style={styles.lista}>
        {favoritos && favoritos.map((titulo) => {
          const jogoItem = jogo.find(j => j.titulo === titulo);
          if (!jogoItem) return null;
          return (
            <CardFavoritos key={jogoItem.id} jogo={jogoItem} />
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
    marginBottom: 10,
  },
  titulo: {
    color: '#E1E2EB',
    fontSize: 28,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  subtitulo: {
    color: '#A3C9FF',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    marginTop: 4,
  },
  lista: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 20,
    gap: 12,
    marginTop: 10,
  },
});
