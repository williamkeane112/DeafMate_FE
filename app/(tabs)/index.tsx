import { Image, View, Text, StyleSheet, ScrollView } from "react-native";

import { styled } from "nativewind";
import { router, SplashScreen } from "expo-router";

import CustomButton from "@/components/CustomButton";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export default function HomeScreen() {
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          router.push("/page/dashboard");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkUserLogin();
  }, []);
  const StyledText = styled(Text);
  const StyledView = styled(View);
  const StyledImage = styled(Image);
  const StyledScrol = styled(ScrollView);

  return (
    <StyledView className="flex-1 items-center bg-Main">
      <StyledScrol className="mx-5">
        {/* hero img */}
        <StyledView className="bg-white flex-row items-center justify-center rounded-full mt-[50%] w-52 h-52  mx-auto" style={styles.shadow}>
          <StyledImage className="mt-10" style={{ width: 160, height: 160 }} source={require("../../assets/img/firstScreenImg.png")} />
        </StyledView>

        {/* teks and logo deafmate */}
        <StyledView className="flex items-center">
          <StyledView className="flex-row items-center justify-center w-40 mt-4 mx-auto">
            <StyledImage className="" style={{ width: 250, height: 41 }} source={require("../../assets/img/DeafMate.png")} />
          </StyledView>

          <StyledText className="text-center mx-11 mt-5 text-Main font-bold text-[17px] font-pRegular">
            Komunikasi Tanpa Batas. menyatukan jiwa dalam bahasa universal dengan makna yang mendalam.
          </StyledText>
        </StyledView>

        {/* button */}
        <StyledView className="mt-52 flex items-center">
          <CustomButton title="Buat akun" handlePress={() => router.push("/auth/register")} styleButton="bg-ButtonBG w-full" textStyle="text-white font-pRegular" />

          <CustomButton title="Masuk ke akun" handlePress={() => router.push("/auth/login")} styleButton="" textStyle="text-[#2573D5] mt-3 font-pRegular" />
        </StyledView>
      </StyledScrol>
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
