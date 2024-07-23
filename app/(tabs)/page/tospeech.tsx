import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React, { useState } from "react";
import * as Speech from "expo-speech";
import { styled } from "nativewind";

// icon
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";

// nativewind
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledScrol = styled(ScrollView);
const StyledLink = styled(Link);
const StyledButton = styled(TouchableOpacity);
const StyledInput = styled(TextInput);

const tospeech = () => {
  const [language, setLanguage] = useState("ind");
  const [settingOption, setSettingOption] = useState({
    text: "",
    pitch: 1,
    rate: 1,
  });
  const handelLanguage = () => {
    setLanguage((set) => (set === "ind" ? "en" : "ind"));
  };
  const speak = () => {
    const options = {
      pitch: settingOption.pitch,
      rate: settingOption.rate,
      language: language,
    };
    Speech.speak(settingOption.text, options);
  };

  return (
    <StyledScrol className="flex-1 bg-Main">
      <StyledView className="mx-5 mt-12">
        {/* arow */}
        <StyledLink to="/page/dashboard">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>

        {/* input text */}
        <StyledView className="mt-5">
          <StyledInput
            className="pb-40 pt-2 px-2 bg-white rounded-lg placeholder:text-lg font-extrabold text-Main "
            onChangeText={(text) => setSettingOption({ ...settingOption, text })}
            value={settingOption.text}
            placeholder="Masukan Text"
            style={styles.shadow}
          />
        </StyledView>

        <StyledView className="mt-10 flex-row justify-between items-center mb-10 ">
          {/* opt */}

          <StyledView>
            <StyledText className="text-[#CECECE] font-semibold font-pRegular">Pilih Bahasa:</StyledText>
            <StyledView className="w-[109px] bg-white py-1 rounded-[4px] mt-1" style={styles.shadow}>
              <StyledButton onPress={handelLanguage} className="flex-row justify-between px-2 items-center mb-1 mt-1">
                <StyledText className="text-Main font-bold text-base font-pRegular">{language === "ind" ? "Indonesia" : "English"}</StyledText>
                <MaterialIcons name="change-circle" size={22} color="#CECECE" />
              </StyledButton>
            </StyledView>
          </StyledView>

          {/*  */}
          <StyledButton onPress={speak} className="py-2 rounded-md px-16 mt-6 bg-[#2573D5]" style={styles.shadow}>
            <StyledText className="text-xl text-white font-pRegular font-bold">speak</StyledText>
          </StyledButton>
        </StyledView>
        {/* end */}
      </StyledView>
    </StyledScrol>
  );
};

export default tospeech;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
