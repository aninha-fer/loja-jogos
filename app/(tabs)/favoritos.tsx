import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import axios from 'axios';
import { Image } from 'expo-image';
import { router } from "expo-router";
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path, Polygon } from 'react-native-svg';

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

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://projeto-steam.vercel.app/jogos');
        setJogo(response.data); 
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  async function toggleFavorito(titulo: string) {
    try {
      const response = await fetch('https://projeto-steam.vercel.app/remover-favorito', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: titulo
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
      }

      const json = await response.json();
      console.log('Removido dos favoritos:', json);
      setFavoritos((prev) => prev.filter((jogo) => jogo.titulo !== titulo));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    }
  }

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
        <Pressable
          key={jogoItem.id}
          style={styles.card}
          onPress={() =>
            router.push({
            pathname: '/tela-jogo',
            params: {
              id: jogoItem.id,
              titulo: jogoItem.titulo,
              capa: jogoItem.capa,
              descricao: jogoItem.descricao,
              preco: jogoItem.preco,
              genero: jogoItem.genero,
              dataLancamento: jogoItem.dataLancamento,
              tamanho: jogoItem.tamanho,
              idadeMinima: jogoItem.idadeMinima,
          },
        } as any)
      }
    >
            <View style={styles.imgCard}>
              <Image source={{ uri: jogoItem.capa }} style={styles.imagem} contentFit="cover" />
            </View>

            <View style={styles.cardInfo}>
              <Text style={styles.cardTitulo}>{jogoItem.titulo}</Text>
              <View style={styles.categoriasRow}>
                <Text style={styles.categoriaText}>{jogoItem.genero}</Text>
              </View>
            </View>

            <Pressable style={styles.heartButton} onPress={() => toggleFavorito(jogoItem.titulo)}>
              <Svg width="16" height="16" viewBox="0 0 24 24" fill={'#ffffff'} stroke="#ffffff" strokeWidth="2">
                <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </Svg>
            </Pressable>

            <Pressable style={styles.jogarButton} onPress={() => { /* ação jogar */ }}>
              <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <Polygon points="2,1 9,5 2,9" fill="#0A0D13" />
              </Svg>
              <Text style={styles.jogarText}>JOGAR</Text>
            </Pressable>
          </Pressable>
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
  card: {
    backgroundColor: '#191C22',
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 12,
  },
  imgCard: {
    width: 64,
    height: 64,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  cardInfo: {
    flex: 1,
    flexDirection: 'column',
    gap: 4,
  },
  cardTitulo: {
    color: '#E1E2EB',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  categoriasRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 4,
  },
  categoriaText: {
    color: '#A3C9FF',
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  infoText: {
    color: '#6B7280',
    fontSize: 9,
    letterSpacing: 0.4,
  },
  heartButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  jogarButton: {
    backgroundColor: '#A3C9FF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  jogarText: {
    color: '#0A0D13',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
});
