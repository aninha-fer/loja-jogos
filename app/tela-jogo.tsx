import { Image } from "expo-image";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";



export default function GameDetailsScreen() {
  const params = useLocalSearchParams();

  const titulo = String(params.titulo ?? "Jogo");
  const capa = String(params.capa ?? "");
  const descricao = String(params.descricao ?? "");
  const preco = Number(params.preco ?? 0);
  const genero = String(params.genero ?? "");
  const dataLancamento = String(params.dataLancamento ?? "");
  const tamanho = Number(params.tamanho ?? 0);
  const idadeMinima = Number(params.idadeMinima ?? 0);
  const categorias = genero ? [genero] : [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ headerShown: false }} />
      <Image source={{ uri: capa }} style={styles.banner} contentFit="cover" />


      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
      </View>

      <View style={styles.body}>
        <View style={styles.tagsRow}>
          {categorias.map((cat, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{cat}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>{titulo}</Text>
        <Text style={styles.subtitle}>Detalhes do jogo</Text>

        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>PREÇO</Text>
            <Text style={styles.infoValue}>R$ {preco.toFixed(2)}</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>TAMANHO</Text>
            <Text style={styles.infoValue}>{tamanho} GB</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>IDADE</Text>
            <Text style={styles.infoValue}>{idadeMinima}+</Text>
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>LANÇAMENTO</Text>
            <Text style={styles.infoValue}>{dataLancamento}</Text>
          </View>
        </View>

        <Pressable style={styles.downloadButton}>
          <Text style={styles.downloadText}>BAIXAR AGORA</Text>
        </Pressable>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Jogo</Text>
          <Text style={styles.description}>{descricao}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Requisitos</Text>

          <View style={styles.requirementCard}>
            <Text style={styles.requirementTitle}>MÍNIMO</Text>
            <Text style={styles.requirementText}>OS: Win 10/11</Text>
            <Text style={styles.requirementText}>GPU: RTX 2060</Text>
            <Text style={styles.requirementText}>CPU: Core i5-10th</Text>
          </View>

          <View style={styles.requirementCard}>
            <Text style={styles.requirementTitle}>RECOMENDADO</Text>
            <Text style={styles.requirementText}>OS: Win 11</Text>
            <Text style={styles.requirementText}>GPU: RTX 4070</Text>
            <Text style={styles.requirementText}>CPU: Core i9-12th</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
  },
  content: {
    paddingBottom: 40,
  },
  banner: {
    width: "100%",
    height: 320,
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "rgba(20,20,30,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },
  body: {
    marginTop: -30,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    backgroundColor: "#050816",
    padding: 20,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },
  tag: {
    backgroundColor: "#1A233A",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    color: "#D7E6FF",
    fontSize: 11,
    fontWeight: "700",
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 6,
  },
  subtitle: {
    color: "#9CB2D1",
    fontSize: 15,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  infoCard: {
    width: "48%",
    backgroundColor: "#121A2E",
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 14,
  },
  infoLabel: {
    color: "#9CB2D1",
    fontSize: 11,
    marginBottom: 8,
  },
  infoValue: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
  },
  downloadButton: {
    backgroundColor: "#4BA3FF",
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 28,
  },
  downloadText: {
    color: "#08111F",
    fontWeight: "900",
    fontSize: 16,
  },
  section: {
    marginBottom: 26,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 14,
  },
  description: {
    color: "#D3DBE8",
    lineHeight: 24,
    fontSize: 15,
  },
  requirementCard: {
    backgroundColor: "#121A2E",
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  requirementTitle: {
    color: "#9EC5FF",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 10,
  },
  requirementText: {
    color: "#fff",
    fontSize: 14,
    marginBottom: 6,
  },
});