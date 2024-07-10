import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";

// icon
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const dashboard = () => {
  const StyledText = styled(Text);
  const StyledView = styled(View);
  const StyledImage = styled(Image);
  const StyledLink = styled(Link);
  const StyledScroll = styled(ScrollView);
  return (
    <StyledScroll className="flex-1 bg-Main">
      <StyledView className="mx-3 mt-5">
        {/* user */}
        <StyledView className="flex-row items-center justify-end">
          <StyledText className="mx-2 font-semibold text-lg">Jhon Doe</StyledText>
          <FontAwesome name="user-circle" size={35} color="#4C4C4E" />
        </StyledView>

        {/* Deafmate and coin */}
        <StyledView className="flex-row items-center justify-between mt-5 mb-1">
          <StyledImage source={require("../../../assets/img/DeafMate.png")} className="w-[119px] h-[18.6px]" />
          <StyledView className="flex-row items-center justify-between border border-[#CECECE] w-20 px-2 bg-white py-[5px] rounded-md">
            <StyledImage source={require("../../../assets/icon/coin.png")} className="w-[15px] h-[14.6px]" />
            <StyledText className="text-Main font-semibold">1200</StyledText>
          </StyledView>
        </StyledView>

        {/* box hero */}
        <StyledView className="mt-5 bg-white rounded-lg mb-3" style={styles.shadow}>
          <StyledView className="flex-row justify-between flex-wrap">
            <StyledView className="w-[50%]  mx-6 mt-7">
              <StyledText className="font-extrabold text-[26px] ">Hallo, John Doe!</StyledText>
              <StyledText className="text-Main font-semibold text-[12px] mt-2">Ayo lanjutkan perjalanan belajar bahasa isyarat Anda</StyledText>

              <StyledLink to="/" className="bg-[#2573D5] w-24 mt-3 py-2 rounded-[4px] text-center">
                <StyledText className="text-white font-semibold text-sm">Mulai</StyledText>
              </StyledLink>
            </StyledView>
            <StyledImage source={require("../../../assets/img/HeroImg.png")} className="w-[130px] h-40" />
          </StyledView>
        </StyledView>

        {/* box menu  */}
        <StyledView className="mt-5">
          {/* translator section */}
          <StyledText className="text-Main text-base font-semibold">Translator :</StyledText>

          <StyledView className="flex-row space-x-4 mt-3 pr-3">
            {/* translate box */}
            <StyledView className="w-44 flex-row items-center justify-between bg-white py-4 mb-4 rounded-md" style={styles.shadow}>
              <StyledView className="w-24 mx-3">
                <StyledText className="font-semibold text-sm text-Main">Penerjemah Bahasa Isyarat</StyledText>
              </StyledView>
              <StyledView className="mr-5">
                <FontAwesome5 name="hand-paper" size={26} color="#29304D" />
              </StyledView>
            </StyledView>

            {/* text to voice box */}
            <StyledView className="w-44 flex-row items-center justify-between bg-white py-4 mb-4 rounded-md" style={styles.shadow}>
              <StyledView className="w-24 mx-3">
                <StyledText className="font-semibold text-12 text-Main">Teks ke dalam Ucapan</StyledText>
              </StyledView>
              <StyledView className="mr-5">
                <StyledImage source={require("../../../assets/icon/talk.png")} className="w-8 h-8" />
              </StyledView>
            </StyledView>
          </StyledView>
          {/* end translator section*/}

          {/* Komunitas section */}
          <StyledText className="text-Main text-base font-semibold mt-1 mb-3">Komunitas :</StyledText>
          <StyledView className="w-44 flex-row items-center justify-between bg-white py-4 mb-4 rounded-md" style={styles.shadow}>
            <StyledView className="w-24 mx-3">
              <StyledText className="font-semibold text-sm text-Main">Forum Diskusi</StyledText>
            </StyledView>
            <StyledView className="mr-5">
              <Ionicons name="chatbox-outline" size={26} color="#29304D" />
            </StyledView>
          </StyledView>
          {/* end Komunitas section */}
        </StyledView>

        {/* box menu 2 */}
        <StyledView>
          <StyledText className="text-Main text-lg font-semibold mt-5 mb-4">Kelas Bahasa Isyarat :</StyledText>
          {/* BISINDO */}
          <StyledView className="bg-white rounded-lg mb-5" style={styles.shadow}>
            <StyledView className="flex-row justify-between flex-wrap mx-2">
              {/* img */}
              <StyledImage source={require("../../../assets/img/BISI.png")} className="h-40" />

              {/* teks */}
              <StyledView className="w-[65%] mx-2 mt-8">
                <StyledText className="font-extrabold text-[26px] text-Main">BISINDO</StyledText>
                <StyledText className="text-Main font-semibold text-sm mt-2">BISINDO adalah bahasa isyarat yang digunakan dan berkembang alami di kalangan komunitas Tuli di Indonesia.</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
          {/* end BISINDO*/}

          {/* SIBI */}
          <StyledView className="bg-white rounded-lg mb-5" style={styles.shadow}>
            <StyledView className="flex-row justify-between flex-wrap mx-3">
              {/* teks */}
              <StyledView className="w-[65%] mx-2 mt-6">
                <StyledText className="font-extrabold text-[26px] text-Main">SIBI</StyledText>
                <StyledText className="text-Main font-semibold text-sm mt-2">Sistem Isyarat Bahasa Indonesia (SIBI) adalah media komunikasi yang membantu kaum tunarungu berinteraksi dalam masyarakat luas.</StyledText>
              </StyledView>

              {/* img */}
              <StyledImage source={require("../../../assets/img/SIBI.png")} className="h-40" />
            </StyledView>
          </StyledView>
          {/* end SIBI */}
        </StyledView>

        {/* end  box menu 2*/}
      </StyledView>
    </StyledScroll>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
});
export default dashboard;
