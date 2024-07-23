import { StyleSheet, Text, View, Image, TextInput, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { Redirect, router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import * as yup from "yup";

// components
import CustomButton from "@/components/CustomButton";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// nativewind
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledLink = styled(Link);
const StyledInput = styled(TextInput);
const StyledScroll = styled(ScrollView);

const validationSchema = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Email diperlukan"),
  nama: yup.string().required("Nama diperlukan"),
  password: yup.string().min(4, "Password harus memiliki minimal 4 karakter").required("Password diperlukan"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Kofirmasi Password harus sama dengan passowrd")
    .required("Konfirmasi password diperlukan"),
});

const Register = () => {
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

  // logic section

  const [register, setRegister] = useState({
    email: "",
    nama: "",
    password: "",
    confirmPassword: "",
  });
  const { email, nama, password, confirmPassword } = register;

  const handleChange = (name: string, value: string) => {
    setRegister((prevRegister) => ({
      ...prevRegister,
      [name]: value,
    }));
  };

  const [textError, SetTextError] = useState<TeypError>({});

  const handleRegister = async () => {
    try {
      await validationSchema.validate(register, { abortEarly: false });
      const result = await axios.post("http://192.168.135.169:3000/user/register", { email, nama, password, confirmPassword });
      if (result) {
        router.push("/auth/login");
      }
    } catch (err: any) {
      if (err instanceof yup.ValidationError) {
        const newErrors = {};
        err.inner.forEach((validationError) => {
          newErrors[validationError.path] = validationError.message;
        });
        SetTextError(newErrors);
      } else {
        console.log(err);
      }
    }
  };

  return (
    <StyledScroll className="flex-1 bg-Main mb-2">
      {/* arrow */}
      <StyledLink to="/" className="flex h-11 mx-5 mt-12">
        <Entypo name="chevron-thin-left" size={30} color="black" />
      </StyledLink>
      {/* text */}
      <StyledView className="mx-5 flex mt-1">
        <StyledText className="text-Main text-[40px] font-semibold mb-2 font-pRegular">Register</StyledText>
        <StyledText className="mr-10 text-[15px] font-pRegular">Masukan data anda dengan benar pada formulir dibawah ini untuk mendaftar.</StyledText>
      </StyledView>

      <StyledView className="mt-12 mx-5">
        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] font-pRegular">Alamat Email :</StyledText>
          <StyledInput
            className="bg-white py-2 rounded-lg text-xl pl-2"
            keyboardType="email-address"
            inputMode="email"
            style={styles.shadow}
            value={email}
            textContentType="emailAddress"
            onChangeText={(text) => handleChange("email", text)}
          />
          {textError.email && <StyledText className="text-red-500 font-pRegular">{textError.email}</StyledText>}
        </StyledView>

        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] font-pRegular">Nama :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2" style={styles.shadow} value={nama} onChangeText={(text) => handleChange("nama", text)} />
          {textError.nama && <StyledText className="text-red-500 font-pRegular">{textError.nama}</StyledText>}
        </StyledView>

        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] font-pRegular">Password :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2" style={styles.shadow} value={password} onChangeText={(text) => handleChange("password", text)} />
          {textError.password && <StyledText className="text-red-500 font-pRegular">{textError.password}</StyledText>}
        </StyledView>

        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] font-pRegular">Konfirmasi Password :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2" style={styles.shadow} value={confirmPassword} onChangeText={(text) => handleChange("confirmPassword", text)} />
          {textError.confirmPassword && <StyledText className="text-red-500 font-pRegular">{textError.confirmPassword}</StyledText>}
        </StyledView>

        {/* button */}
        <StyledView className="mt-24 mx-5 flex justify-center items-center">
          <CustomButton title="Daftar Sekarang" handlePress={handleRegister} styleButton="w-full bg-ButtonBG" textStyle="text-white font-pRegular" />
          <CustomButton title="Sudah Punya Akun?" styleButton="w-full mt-2" textStyle="text-[#2573D5] font-pRegular" handlePress={() => router.push("/auth/login")} />
        </StyledView>
      </StyledView>
    </StyledScroll>
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

export default Register;

type TeypError = {
  email?: string;
  nama?: string;
  password?: string;
  confirmPassword?: string;
};