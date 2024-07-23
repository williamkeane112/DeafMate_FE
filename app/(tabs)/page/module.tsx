import { View, Text, Image, ScrollView, TextInput, StyleSheet } from "react-native";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";

// icon
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";

import { router } from "expo-router";

// native wind
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledLink = styled(Link);
const StyledScroll = styled(ScrollView);
const StyledInput = styled(TextInput);
const StyledFontAwsome = styled(FontAwesome);

const module = () => {
  return (
    <StyledScroll className="flex-1 bg-Main">
      <StyledView className="mt-12">
        <StyledLink to="/page/dashboard" className="flex h-11 mx-3">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>
        {/* text and search form */}
        <StyledView className="mx-5 mt-3">
          <StyledText className="text-Main font-extrabold text-3xl font-pRegular">BISINDO</StyledText>

          <StyledView className="flex-row items-center mb-2 mt-5">
            <StyledFontAwsome name="search" size={24} color="black" className="absolute z-10 mx-2" />
            <StyledInput placeholder="Cari Kategori..." className="bg-white py-2 w-full pl-9 text-sm rounded-lg" style={styles.shadow} />
          </StyledView>
        </StyledView>

        {/* perkenalan */}
        <StyledLink to="/listModule/Perkenalan" className="mx-5 bg-white rounded-lg mt-7 mb-8" style={styles.shadow}>
          <StyledView className="flex-row items-center justify-between w-full ">
            <StyledView className="mt-2 mx-10 ">
              <StyledText className="text-2xl font-extrabold text-Main font-pRegular">Perkenalan</StyledText>
              <StyledView className="flex-row items-center mt-3">
                <FontAwesome6 name="clipboard-list" size={24} color="black" />
                <StyledText className="text-lg font-extrabold text-Main ml-2 font-pRegular">0/16</StyledText>
              </StyledView>
            </StyledView>
            <StyledImage source={require("../../../assets/img/moduleImg.png")} className="mt-4 w-[70px] h-28 mx-10" />
          </StyledView>
        </StyledLink>
        {/* huruf */}
        <StyledLink to="/listModule/Huruf" className="mx-5 bg-white rounded-lg mb-8" style={styles.shadow}>
          <StyledView className="flex-row items-center justify-between w-full ">
            <StyledView className="mt-2 mx-10 ">
              <StyledText className="text-2xl font-extrabold text-Main font-pRegular">Huruf</StyledText>
              <StyledView className="flex-row items-center mt-3">
                <FontAwesome6 name="clipboard-list" size={24} color="black" />
                <StyledText className="text-lg font-extrabold text-Main ml-2 font-pRegular">0/16</StyledText>
              </StyledView>
            </StyledView>
            <StyledImage source={require("../../../assets/icon/ABC.png")} className="mt-4 w-28 h-28 mx-10" />
          </StyledView>
        </StyledLink>

        {/* angka */}
        <StyledView className="mx-5 bg-white rounded-lg mb-8" style={styles.shadow}>
          <StyledView className="flex-row items-center justify-between w-full ">
            <StyledView className="mt-2 mx-10 ">
              <StyledText className="text-2xl font-extrabold text-Main font-pRegular">Angka</StyledText>
              <StyledView className="flex-row items-center mt-3">
                <FontAwesome6 name="clipboard-list" size={24} color="black" />
                <StyledText className="text-lg font-extrabold text-Main font-pRegular ml-2">0/26</StyledText>
              </StyledView>
            </StyledView>
            <StyledImage source={require("../../../assets/icon/123.png")} className="mt-4 w-24 h-24 mx-10" />
          </StyledView>
        </StyledView>

        {/* makanan */}
        <StyledView className="mx-5 bg-white rounded-lg mb-8" style={styles.shadow}>
          <StyledView className="flex-row items-center justify-between w-full ">
            <StyledView className="mt-2 mx-10 ">
              <StyledText className="text-2xl font-extrabold text-Main font-pRegular">Makanan</StyledText>
              <StyledView className="flex-row items-center mt-3">
                <FontAwesome6 name="clipboard-list" size={24} color="black" />
                <StyledText className="text-lg font-extrabold text-Main font-pRegular ml-2">0/16</StyledText>
              </StyledView>
            </StyledView>
            <StyledImage source={require("../../../assets/icon/makanan.png")} className="mt-4 w-24 h-24  mx-10" />
          </StyledView>
        </StyledView>

        {/* keluarga */}
        <StyledView className="mx-5 bg-white rounded-lg mb-8" style={styles.shadow}>
          <StyledView className="flex-row items-center justify-between w-full ">
            <StyledView className="mt-2 mx-10">
              <StyledText className="text-2xl font-extrabold text-Main font-pRegular">Keluarga</StyledText>
              <StyledView className="flex-row items-center mt-3">
                <FontAwesome6 name="clipboard-list" size={24} color="black" />
                <StyledText className="text-lg font-extrabold text-Main font-pRegular ml-2">0/16</StyledText>
              </StyledView>
            </StyledView>
            <StyledImage source={require("../../../assets/img/moduleImg.png")} className="mt-4 w-[70px] h-28 mx-10" />
          </StyledView>
        </StyledView>
      </StyledView>
    </StyledScroll>
  );
};

export default module;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
