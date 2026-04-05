import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

type CarrosselCategoriasProps = {
    categorias: string[];
    selecionavel?: boolean;
};

export default function CarrosselCategorias({ categorias, selecionavel = false }: CarrosselCategoriasProps) {
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
    const { categoria } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
      if (!selecionavel) {
        setCategoriaSelecionada(null);
        return;
      }

      if (categoria) {
        setCategoriaSelecionada(categoria.toString());
      } else {
        setCategoriaSelecionada(null);
      }
    }, [categoria, selecionavel]);

    const handleCategoriaPress = (item: string) => {
      if (selecionavel) {
        setCategoriaSelecionada(item);
      }
      router.push(`/explore?categoria=${item}`);
    };

    return (
    <View style={styles.divEsquerda}>
        <Text style={styles.tituloCategoria}>Categorias</Text>
        <FlatList
            data={categorias}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriaRow}
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            directionalLockEnabled
            decelerationRate="fast"
            snapToInterval={110}
            snapToAlignment="start"
            renderItem={({ item }) => (
                <Pressable
                    style={[
                      styles.categoria,
                      categoriaSelecionada === item && styles.categoriaAtiva,
                    ]}
                    onPress={() => handleCategoriaPress(item)}
                >
                    <Text style={[
                      styles.categoriaText,
                      categoriaSelecionada === item && styles.categoriaTextAtiva,
                    ]}>{item}</Text>
                </Pressable>
            )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  divEsquerda: {
    display: 'flex',
    flexDirection: 'column',
    margin: 20,
  },
  categoriaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  tituloCategoria: {
      fontSize: 20,
      color: '#A3C9FF',
      textTransform: 'uppercase',
      fontWeight: '600',
      letterSpacing: 0.6, 
  },
  categoria: {
    backgroundColor: '#272A31',
    height: 40,
    minWidth: 100,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(64, 71, 83, 0.10)',
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',  
    marginRight: 10,
  },
  categoriaAtiva: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  categoriaText: {
    color: '#E1E2EB',
  },
  categoriaTextAtiva: {
    color: '#020617',
  },
});