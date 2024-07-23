import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";

// icon
import { Entypo, FontAwesome6 } from "@expo/vector-icons";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledLink = styled(Link);
const StyledScroll = styled(ScrollView);
const StyledButton = styled(TouchableOpacity);
const game = () => {
  const { latihan, game } = useLocalSearchParams();
  return (
    <StyledScroll className="flex-1 bg-Main">
      <StyledView className="mt-12 mx-5">
        {/* arow */}
        <StyledLink to={`/latihan/${latihan}`} className="flex h-11 -ml-2">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>

        {/* camera */}

        {/* box taks */}
        <StyledView className="bg-white flex-row items-center py-3 px-5 rounded-md mb-7" style={styles.shadow}>
          <FontAwesome6 name="clipboard-list" size={30} color="black" />
          <StyledText className="ml-7 font-pRegular text-Main font-bold text-base">Buatlah Kata “Hallo“</StyledText>
        </StyledView>
        {/* box jawaban */}
        <StyledView className="bg-white py-3 rounded-md mb-5" style={styles.shadow}>
          <StyledText className="ml-7 font-pRegular text-Main font-bold text-base">Jawaban :</StyledText>
          <StyledText className="uppercase text-[#CECECE] mx-auto text-5xl font-pRegular font-semibold mt-6 mb-4">hallo</StyledText>
        </StyledView>

        {/* button pelajari lagi */}
        <StyledButton className="bg-[#2573D5] py-3 rounded-md" onPress={() => router.push(`/listModule/${latihan}`)}>
          <StyledText className="text-white mx-auto font-bold text-xl">Pelajari Lagi</StyledText>
        </StyledButton>
        {/* end */}
      </StyledView>
    </StyledScroll>
  );
};

export default game;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
