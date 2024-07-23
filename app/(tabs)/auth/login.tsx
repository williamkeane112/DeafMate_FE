import { Text, View, Image, TextInput, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { Redirect, router } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import * as yup from "yup";
import * as SecureStore from "expo-secure-store";

// componet
import CustomButton from "@/components/CustomButton";
import axios from "axios";

// nativewind
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledImage = styled(Image);
const StyledLink = styled(Link);
const StyledInput = styled(TextInput);

// validation form
const validation = yup.object().shape({
  email: yup.string().email("Email tidak valid").required("Email diperlukan"),
  password: yup.string().min(4, "Password harus memiliki minimal 4 karakter").required("password diperlukan"),
});

const login = () => {
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

  const [userInputDataLogin, setUserInputDataLogin] = useState({
    email: "",
    password: "",
  });

  const [textError, SetTextError] = useState<TypeError>({});
  const { email, password } = userInputDataLogin;

  const handelDataLogin = (name: string, value: string) => {
    setUserInputDataLogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };

  const login = async () => {
    try {
      await validation.validate(userInputDataLogin, { abortEarly: false });
      const result = await axios.post("http://192.168.135.169:3000/user/login", { email, password });
      const token = result.data[0].payload.token;

      await SecureStore.setItemAsync("userToken", token);
      router.navigate("/page/dashboard");
    } catch (err: any) {
      if (err.response && err.response.data) {
        SetTextError({ message: err.response.data[0].message });
      } else if (err instanceof yup.ValidationError) {
        const newErrors: TypeError = {};
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
    <StyledView className="flex-1 bg-Main">
      {/* arow */}
      <StyledLink to="/" className="flex h-11 mx-5 mt-12">
        <Entypo name="chevron-thin-left" size={30} color="black" />
      </StyledLink>
      {/* teks */}
      <StyledView className="mx-5 flex mt-2">
        <StyledText className="text-Main text-[35px] font-semibold mb-4 font-pRegular">Selemat Datang Kembali !</StyledText>
      </StyledView>

      {/* Img DeafMate */}
      <StyledView className="flex items-center mt-10">
        <StyledImage source={require("../../../assets/img/DeafMate.png")}></StyledImage>
      </StyledView>
      {/* form input */}
      <StyledView className="mx-5 mt-7">
        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] font-pRegular">Alamat Email :</StyledText>
          <StyledInput
            className="bg-white py-2 rounded-lg text-xl pl-2 "
            keyboardType="email-address"
            inputMode="email"
            style={styles.shadow}
            value={email}
            textContentType="emailAddress"
            onChangeText={(text) => handelDataLogin("email", text)}
          />
          {textError.email && <StyledText className="text-red-500 font-pRegular">{textError.email}</StyledText>}
        </StyledView>
        <StyledView className="mb-7">
          <StyledText className="mb-1 text-[16px] text-[#989BA9] font-pRegular">Kata Sandi :</StyledText>
          <StyledInput className="bg-white py-2 rounded-lg text-xl pl-2 " style={styles.shadow} value={password} onChangeText={(text) => handelDataLogin("password", text)} />
          {textError.password && <StyledText className="text-red-500 font-pRegular">{textError.password}</StyledText>}
        </StyledView>
        {/* button */}
        <StyledView className="mt-14 mx-5 flex justify-center items-center">
          <CustomButton title="Masuk" handlePress={login} styleButton="bg-ButtonBG w-full" textStyle="text-white font-pRegular" />

          <CustomButton title="Belum Memiliki akun ?" handlePress={() => router.push("/page/dashboard")} styleButton="bg-ButtonBg mt-4" textStyle="text-[#2573D5] font-pRegular" />
        </StyledView>
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

type TypeError = {
  email?: string;
  password?: string;
  message?: string;
};
