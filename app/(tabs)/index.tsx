import Card from '@/components/card';
import CarrosselCategorias from '@/components/carrossel-categorias';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import axios from 'axios';
import { Image } from 'expo-image';
import { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Polygon } from 'react-native-svg';

type Jogo = {
  titulo: string;
  descricao: string;
  preco: number;
  genero: string;
  dataLancamento: string;
  tamanho: number;
  capa: string;
  idadeMinima: number;
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_GAP = 20;
const ITEM_SIZE = CARD_WIDTH + CARD_GAP;

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const [data, setData] = useState<Jogo[]>([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const intervaloRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const categorias = ['acao', 'RPG', 'sobrevivencia', 'aventura', 'esporte'];

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://projeto-steam.vercel.app/jogos');
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0) return;

    intervaloRef.current = setInterval(() => {
      setIndiceAtual(prev => {
        const proximo = (prev + 1) % data.length;
        flatListRef.current?.scrollToIndex({ index: proximo, animated: true });
        return proximo;
      });
    }, 3000);

    return () => {
      if (intervaloRef.current) clearInterval(intervaloRef.current);
    };
  }, [data]);

  function iniciarIntervalo() {
    if (intervaloRef.current) clearInterval(intervaloRef.current);
    intervaloRef.current = setInterval(() => {
      setIndiceAtual(prev => {
        const proximo = (prev + 1) % data.length;
        flatListRef.current?.scrollToIndex({ index: proximo, animated: true });
        return proximo;
      });
    }, 3000);
  }

  function aoScrollar(event: any) {
    const offsetX = event.nativeEvent.contentOffset.x;
    const novoIndice = Math.round(offsetX / ITEM_SIZE);
    if (novoIndice !== indiceAtual) {
      setIndiceAtual(novoIndice);
      iniciarIntervalo();
    }
  }

  function renderDestaque({ item }: { item: Jogo }) {
    return (
      <View style={styles.destaqueSemana}>
        <Image source={{ uri: item.capa }} style={styles.destaqueImagem} contentFit="cover" />
        <View style={styles.destaqueOverlay} />
        <View style={styles.destaqueContent}>
          <Text style={styles.tituloDestaque}>Destaque da Semana</Text>
          <Text style={styles.titulo}>{item.titulo}</Text>
          <Text style={styles.descricao}>{item.descricao}</Text>
          <Pressable
            style={styles.jogarButton}
            onPress={() => Alert.alert('Download', 'Iniciando download...')}
          >
            <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <Polygon points="2,1 9,5 2,9" fill="#002A51" />
            </Svg>
            <Text style={styles.jogarText}>JOGAR</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
      contentContainerStyle={{ paddingBottom: 100 }}
      disableScrollViewPanResponder={true}
    >
      <View style={{ marginTop: 20 }}>
        <FlatList
          ref={flatListRef}
          data={data}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderDestaque}
          horizontal
          pagingEnabled={false}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={aoScrollar}
          snapToInterval={ITEM_SIZE}
          snapToAlignment="start"
          decelerationRate="fast"
          nestedScrollEnabled={true}
          scrollEventThrottle={16}
          contentContainerStyle={{ paddingHorizontal: 20, gap: CARD_GAP }}
          getItemLayout={(_, index) => ({
            length: ITEM_SIZE,
            offset: ITEM_SIZE * index,
            index,
          })}
        />

        <View style={styles.indicadores}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicador,
                index === indiceAtual ? styles.indicadorAtivo : styles.indicadorInativo,
              ]}
            />
          ))}
        </View>
      </View>

      <CarrosselCategorias categorias={categorias} selecionavel={false} />

      <View style={styles.divEsquerda}>
        <Text style={styles.titulo}>Mais Vendidos</Text>
        <Text style={styles.subtitulo}>Tendências globais hoje</Text>
      </View>

      <View style={styles.gridCards}>
        {data.map((jogo, index) => (
          <Card key={index} jogo={jogo} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  divEsquerda: {
    flexDirection: 'column',
    margin: 20,
  },
  titulo: {
    color: '#E1E2EB',
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  subtitulo: {
    color: '#E1E2EB',
    textTransform: 'uppercase',
    fontSize: 12,
    letterSpacing: 1.2,
  },
  gridCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    justifyContent: 'space-between',
    rowGap: 20,
  },
  destaqueSemana: {
    width: CARD_WIDTH,
    height: 400,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#020617',
  },
  destaqueImagem: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  destaqueOverlay: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  destaqueContent: {
    position: 'absolute',
    top: 20, left: 20, right: 20, bottom: 20,
    gap: 5,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  descricao: {
    color: '#E1E2EB',
    fontSize: 12,
    letterSpacing: 1.2,
    marginTop: 12,
  },
  jogarButton: {
    backgroundColor: '#A3C9FF',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 110,
  },
  jogarText: {
    color: '#002A51',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  tituloDestaque: {
    backgroundColor: 'rgba(163, 201, 255, 0.15)',
    width: 200,
    paddingHorizontal: 5,
    paddingVertical: 4,
    fontSize: 10,
    borderRadius: 50,
    textTransform: 'uppercase',
    color: '#A3C9FF',
    fontWeight: '700',
    letterSpacing: 1.2,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'rgba(163, 201, 255, 0.3)',
  },
  indicadores: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  indicador: {
    height: 6,
    borderRadius: 3,
  },
  indicadorAtivo: {
    width: 20,
    backgroundColor: '#A3C9FF',
  },
  indicadorInativo: {
    width: 6,
    backgroundColor: 'rgba(163, 201, 255, 0.3)',
  },
});