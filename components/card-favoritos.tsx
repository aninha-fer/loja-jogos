import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import Svg, { Path, Polygon } from "react-native-svg";

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

export default function CardFavoritos({ jogo }: { jogo: Jogo }) {
    const [favoritado, setFavoritado] = useState(true);
    const router = useRouter();

    const toggleFavorito = async () => {
        if (!favoritado) {
            try {
                const response = await fetch('https://projeto-steam.vercel.app/adicionar-favorito', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        titulo: jogo.titulo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                setFavoritado(true);
            } catch (error : any) {
                Alert.alert('Erro', error.message);
            }
        } else {
            try {
                const response = await fetch('https://projeto-steam.vercel.app/remover-favorito', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        titulo: jogo.titulo
                    }),
                });

                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
                }

                const json = await response.json();
                setFavoritado(false);
            } catch (error : any) {
                Alert.alert('Erro', error.message);
            }
        }
    };
    function abrirJogo() {
        router.push({
            pathname: '/tela-jogo',
            params: {
                titulo: jogo.titulo,
                capa: jogo.capa,
                descricao: jogo.descricao,
                categorias: jogo.genero,
                preco: jogo.preco,
                dataLancamento: jogo.dataLancamento,
                tamanho: jogo.tamanho,
                idadeMinima: jogo.idadeMinima,
            },
        } as any);
    }

    return (
        <Pressable key={jogo.id} style={styles.card} onPress={() => abrirJogo()}>
            <View style={styles.imgCard}>
                <Image source={{ uri: jogo.capa }} style={styles.imagem} contentFit="cover" />
            </View>
            
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitulo}>{jogo.titulo}</Text>
                <View style={styles.categoriasRow}>
                <Text style={styles.categoriaText}>{jogo.genero}</Text>
                </View>
            </View>
            
            <Pressable style={styles.heartButton} onPress={() => toggleFavorito()}>
                <Svg width="16" height="16" viewBox="0 0 24 24" fill={favoritado ? '#ffffff' : 'none'} stroke="#ffffff" strokeWidth="2">
                    <Path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </Svg>
            </Pressable>
            
            <Pressable style={styles.jogarButton} onPress={() => { Alert.alert('Download', 'Iniciando download...') }}>
                <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <Polygon points="2,1 9,5 2,9" fill="#0A0D13" />
                </Svg>
                <Text style={styles.jogarText}>JOGAR</Text>
            </Pressable>
        </Pressable>
    );
}

const styles = StyleSheet.create({
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
});