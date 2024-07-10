import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";


const login = () => {
  const StyledText = styled(Text);
  const StyledView = styled(View);
  const StyledImage = styled(Image);
  const StyledLink = styled(Link);
  const StyledInput = styled(TextInput);
  return (
    <StyledView className="flex-1 bg-Main">
      {/* arow */}
      <StyledLink to="/" className="flex h-11 mx-5 mt-5">
      <Entypo name="chevron-thin-left" size={30} color="black" />
      </StyledLink>
      {/* teks */}
      <StyledView className="mx-5 flex mt-2">
        <StyledText className="text-Main text-[35px] font-semibold mb-4">Selemat Datang Kembali !</StyledText>
      </StyledView>

      {/* Img DeafMate */}
      <StyledView className="flex items-center mt-10">
        <StyledImage source={require("../../../assets/img/DeafMate.png")}></StyledImage>
      </StyledView>
      {/* form input */}
      <StyledView className="mx-5 mt-7">
        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] ">Alamat Email :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2 " style={styles.shadow} />
        </StyledView>
        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] ">Kata Sandi :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2 " style={styles.shadow} />
        </StyledView>
      </StyledView>
      {/* button */}
      <StyledView className="mt-14 mx-5 flex justify-center items-center">
        <StyledLink to="/page/dashboard" className="py-3 w-full rounded-lg bg-ButtonBG px-[149px]">
          <StyledText className="text-white text-xl font-semibold">Masuk</StyledText>
        </StyledLink>
        <StyledLink to="/auth/register" className="mt-4">
          <StyledText className="text-[#2573D5] text-lg font-semibold">Belum Punya akun ?</StyledText>
        </StyledLink>
      </StyledView>
    </StyledView>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
});

export default login;
