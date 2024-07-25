import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";

// icon
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import axios from "axios";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledLink = styled(Link);
const StyledScroll = styled(ScrollView);
const StyledButton = styled(TouchableOpacity);
const StyledInput = styled(TextInput);
const StyledFontAwsome = styled(FontAwesome);

const forum = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://192.168.3.169:3000/forum/getData");
        setData(response.data[0].payload);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  });

  const batasKata = (text, limit) => {
    const word = text.split(" ");
    if (word.length > limit) {
      return word.slice(0, limit).join(" ") + "...";
    }
    return text;
  };

  return (
    <StyledView className="flex-1 bg-Main">
      <StyledView className="mx-5 mt-16">
        {/* text and search box */}
        <StyledText className="text-Main font-extrabold text-3xl font-pRegular">BISINDO</StyledText>

        <StyledView className="flex-row items-center mt-6">
          <StyledFontAwsome name="search" size={24} color="black" className="absolute z-10 mx-2" />
          <StyledInput placeholder="Cari..." className="bg-white py-2 w-full pl-9 text-sm rounded-lg" style={styles.shadow} />
        </StyledView>

        {/* box create and menu utama */}
        <StyledView className="flex-row justify-between items-center mt-6">
          <StyledButton onPress={() => router.push("/page/createforum")} className="flex-row items-center justify-between bg-[#2573D5] px-3 py-2 w-40 rounded-md">
            <StyledText className="text-white font-bold text-lg font-pRegular">Buat Diskusi</StyledText>
            <Ionicons name="chatbox-outline" size={30} color="white" />
          </StyledButton>
          <StyledButton onPress={() => router.push("/page/dashboard")} className="flex-row items-center justify-between bg-white px-3 py-2 w-40 rounded-md" style={styles.shadow}>
            <StyledText className="text-[#2573D5] font-bold text-lg font-pRegular">Menu utama</StyledText>
            <FontAwesome name="home" size={30} color="#2573D5" />
          </StyledButton>
        </StyledView>
      </StyledView>

      {/* box box pertanyaan  */}
      <StyledScroll className="mt-10">
        {data.map((item, i) => (
          <StyledView key={i} className="bg-white py-3 rounded-lg mb-7 mx-5" style={styles.shadow2}>
            {/* username and icon */}
            <StyledView className="flex-row items-center mb-3 ml-3">
              <FontAwesome name="user-circle" size={30} color="#4C4C4E" />
              <StyledText className="mx-2 font-bold text-base font-pRegular">{item.nama}</StyledText>
            </StyledView>
            {/* isi content */}
            <StyledView className="mx-8 mb-5">
              <StyledText className="text-[13px]">{batasKata(item.content, 40)}</StyledText>
            </StyledView>
            {/* button liat post */}
            <StyledButton onPress={() => router.push(`/forum/${item.id}`)} className="ml-auto px-4 flex-row items-center">
              <StyledText className="mx-3 font-pRegular text-Main font-bold text-sm ">Lihat Postingan{item.id}</StyledText>
              <AntDesign name="arrowright" size={24} color="#29304D" />
            </StyledButton>
          </StyledView>
        ))}
      </StyledScroll>
      {/* end */}
    </StyledView>
  );
};

export default forum;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  shadow2: {
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
