import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";

// icon
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { router } from "expo-router";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledLink = styled(Link);
const StyledScroll = styled(ScrollView);
const StyledButton = styled(TouchableOpacity);

const dashboard = () => {
  const [userName, setUserName] = useState("");
  const [userDropDown, setUserDropDown] = useState(false);
  const [tokens, setToken] = useState("");

  const checkUserLogin = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        setToken(token);
        const result = await axios.post("http://192.168.3.169:3000/user/userInfo", { token: token });
        setUserName(result.data[0].payload[0].nama);
      } else {
        router.navigate("/auth/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  const handelLogout = async () => {
    setToken("");
    await SecureStore.deleteItemAsync("userToken");
    router.navigate("/auth/login");
  };

  return (
    <StyledView className="flex-1 bg-Main">
      <StyledScroll showsVerticalScrollIndicator={false} className="mx-5 mt-12">
        {/* user */}
        <StyledButton
          onPress={() => {
            setUserDropDown(!userDropDown);
          }}
          className="flex-row items-center justify-end"
        >
          <StyledText className="mx-2 font-semibold text-lg font-pRegular">{userName}</StyledText>
          <FontAwesome name="user-circle" size={35} color="#4C4C4E" />
        </StyledButton>
        {userDropDown ? (
          <StyledView className="absolute">
            <StyledButton className="w-20 py-1 bg-rose-500" onPress={handelLogout}>
              <StyledText className="text-white text-center font-pRegular">Logout</StyledText>
            </StyledButton>
          </StyledView>
        ) : null}

        {/* Deafmate and coin */}
        <StyledView className="flex-row items-center justify-between mt-5 mb-1">
          <StyledImage source={require("../../../assets/img/DeafMate.png")} className="w-[119px] h-[18.6px]" />
          <StyledView className="flex-row items-center justify-between border border-[#CECECE] w-20 px-2 bg-white py-[5px] rounded-md">
            <StyledImage source={require("../../../assets/icon/coin.png")} className="w-[15px] h-[14.6px]" />
            <StyledText className="text-Main font-semibold font-pRegular">1200</StyledText>
          </StyledView>
        </StyledView>

        {/* box hero */}
        <StyledView className="mt-5 bg-white rounded-lg mb-3" style={styles.shadow}>
          <StyledView className="flex-row justify-between flex-wrap mb-2">
            <StyledView className="w-[50%]  mx-5 mt-7">
              <StyledText className="font-extrabold text-[26px] font-pRegular">Hallo, {userName}</StyledText>
              <StyledText className="text-Main font-semibold text-[12px] mt-2 font-pRegular">Ayo lanjutkan perjalanan belajar bahasa isyarat Anda</StyledText>

              <StyledLink to="/page/module" className="bg-[#2573D5] w-24 mt-3 py-2 rounded-[4px] text-center">
                <StyledText className="text-white font-semibold text-sm font-pRegular">Mulai</StyledText>
              </StyledLink>
            </StyledView>
            <StyledImage source={require("../../../assets/img/HeroImg.png")} className="w-[130px] h-40" />
          </StyledView>
        </StyledView>

        {/* box menu  */}
        <StyledView className="mt-5">
          {/* translator section */}
          <StyledText className="text-Main text-base font-semibold font-pRegular">Translator :</StyledText>

          <StyledView className="flex-row justify-between ">
            {/* translate box */}
            <StyledView className="w-40 flex-row items-center justify-between bg-white py-4 mb-4 rounded-md" style={styles.shadow}>
              <StyledView className="w-24 mx-3">
                <StyledLink to="/page/translate" className="font-semibold text-sm text-Main font-pRegular">
                  Penerjemah Bahasa Isyarat
                </StyledLink>
              </StyledView>
              <StyledView className="mr-5">
                <FontAwesome5 name="hand-paper" size={26} color="#29304D" />
              </StyledView>
            </StyledView>

            {/* text to voice box */}
            <StyledView className="w-40 flex-row items-center justify-between bg-white py-4 mb-4 rounded-md" style={styles.shadow}>
              <StyledLink to="/page/tospeech" className="w-24 mx-3">
                <StyledText className="font-semibold text-12 text-Main font-pRegular">Teks ke dalam Ucapan</StyledText>
              </StyledLink>
              <StyledView className="mr-5">
                <StyledImage source={require("../../../assets/icon/talk.png")} className="w-8 h-8" />
              </StyledView>
            </StyledView>
          </StyledView>
          {/* end translator section*/}

          {/* Komunitas section */}
          <StyledText className="text-Main text-base font-semibold mt-1 mb-3 font-pRegular">Komunitas :</StyledText>
          <StyledView className="w-40 flex-row items-center justify-between bg-white py-4 mb-4 rounded-md" style={styles.shadow}>
            <StyledLink to="/page/forum" className="w-24 mx-3">
              <StyledText className="font-semibold text-sm text-Main font-pRegular">Forum Diskusi</StyledText>
            </StyledLink>
            <StyledView className="mr-5">
              <Ionicons name="chatbox-outline" size={26} color="#29304D" />
            </StyledView>
          </StyledView>
          {/* end Komunitas section */}
        </StyledView>

        {/* box menu module */}
        <StyledView>
          <StyledText className="text-Main text-lg font-semibold mt-5 mb-4 font-pRegular">Kelas Bahasa Isyarat :</StyledText>
          {/* BISINDO */}
          <StyledView className="bg-white rounded-lg mb-7" style={styles.shadow}>
            <StyledLink to="/page/module" className="max-w-full">
              <StyledView className="flex-row justify-between w-full">
                {/* img */}
                <StyledImage source={require("../../../assets/img/BISI.png")} className="h-40 " />

                {/* teks */}
                <StyledView className="mt-10 w-60 ml-4">
                  <StyledText className="font-extrabold text-[26px] text-Main mx-1 font-pRegular">BISINDO</StyledText>
                  <StyledText className="text-Main font-semibold text-[12px] mt-2 mx-1 font-pRegular mr-2">BISINDO adalah bahasa isyarat yang digunakan dan berkembang alami di kalangan komunitas Tuli di Indonesia.</StyledText>
                </StyledView>
              </StyledView>
            </StyledLink>
          </StyledView>
          {/* end BISINDO*/}

          {/* SIBI */}
          <StyledView className="bg-white rounded-lg mb-5" style={styles.shadow}>
            <StyledView className="flex-row justify-between flex-wrap mx-3">
              {/* teks */}
              <StyledView className="w-[65%] mx-2 mt-6">
                <StyledText className="font-extrabold text-[26px] text-Main font-pRegular">SIBI</StyledText>
                <StyledText className="text-Main font-semibold text-[12px] font-pRegular mt-2">Sistem Isyarat Bahasa Indonesia (SIBI) adalah media komunikasi yang membantu kaum tunarungu berinteraksi dalam masyarakat luas.</StyledText>
              </StyledView>

              {/* img */}
              <StyledImage source={require("../../../assets/img/SIBI.png")} className="h-40" />
            </StyledView>
          </StyledView>
          {/* end SIBI */}
        </StyledView>

        {/* end  box menu 2*/}
      </StyledScroll>
    </StyledView>
  );
};

export default dashboard;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
