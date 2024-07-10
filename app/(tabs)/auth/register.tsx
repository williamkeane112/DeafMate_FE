import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const register = () => {
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
        <StyledText className="text-Main text-[40px] font-semibold mb-4">Register</StyledText>
        <StyledText className="mr-10 text-[15px]">Masukan data anda dengan benar pada formulir dibawah ini untuk mendaftar.</StyledText>
      </StyledView>
      {/* form input */}
      <StyledView className="mx-5 mt-12">
        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] ">Alamat Email :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2 " style={styles.shadow} />
        </StyledView>
        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] ">Nama :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2 " style={styles.shadow} />
        </StyledView>
        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] ">Kata Sandi :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2 " style={styles.shadow} />
        </StyledView>
        <StyledView className="">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] ">Konfirmasi Kata Sandi :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2 " style={styles.shadow} />
        </StyledView>
      </StyledView>
      {/* button */}
      <StyledView className="mt-28 mx-5 flex justify-center items-center">
        <StyledLink to="/auth/login" className="py-3 rounded-lg bg-ButtonBG px-[109px]">
          <StyledText className="text-white text-xl font-semibold">Daftar Sekarang</StyledText>
        </StyledLink>
        <StyledLink to="/auth/login" className="mt-4">
          <StyledText className="text-[#2573D5] text-lg font-semibold">Sudah Punya akun ?</StyledText>
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

export default register;
