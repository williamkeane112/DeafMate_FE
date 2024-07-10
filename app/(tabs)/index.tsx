import { Image, View, Text, StyleSheet } from "react-native";

import { styled } from "nativewind";
import { Link } from "expo-router";

export default function HomeScreen() {
  const StyledText = styled(Text);
  const StyledView = styled(View);
  const StyledImage = styled(Image);

  return (
    <StyledView className="flex-1 items-center bg-Main">
      {/* hero img */}
      <StyledView className="bg-white p-28  rounded-full  flex items-center mt-[37%]" style={styles.shadow}>
        <StyledImage className="w-48 h-48 absolute mt-[31px]" source={require("../../assets/img/firstScreenImg.png")} />
      </StyledView>

      {/* teks and logo deafmate */}
      <StyledView className="flex items-center">
        <StyledImage className="flex mt-8" source={require("../../assets/img/DeafMate.png")} />
        <StyledText className="text-center mx-14 mt-5 text-Main font-medium text-[17px]">Komunikasi Tanpa Batas. menyatukan jiwa dalam bahasa universal dengan makna yang mendalam.</StyledText>
      </StyledView>

      {/* button */}
      <StyledView className="flex items-center mt-48">
        <Link href="auth/register" className="py-2 px-28  rounded-lg bg-ButtonBG">
          <StyledText className="text-white text-xl">Buat akun</StyledText>
        </Link>
        <Link href="auth/login" className="mt-6">
          <StyledText className="text-[#2573D5] text-lg font-semibold">Masuk ke akun</StyledText>
        </Link>
      </StyledView>
    </StyledView>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 15,
  },
});
