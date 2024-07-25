import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";

// icon
import { Entypo, Fontisto } from "@expo/vector-icons";
import { router } from "expo-router";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledLink = styled(Link);
const StyledScroll = styled(ScrollView);
const StyledButton = styled(TouchableOpacity);
const StyledInput = styled(TextInput);
const StyledImage = styled(Image);

const createforum = () => {
  const [user_id, setID] = useState(null);
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");

  // get id
  useEffect(() => {
    const checkUserLogin = async () => {
      try {
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          const result = await axios.post("http://192.168.3.169:3000/user/userInfo", { token: token });
          setID(result.data[0].payload[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkUserLogin();
  });
  // logic pilih img
  const selectIMG = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImg(result.assets[0].uri);
    }
  };

  // logic post
  const handelPost = async () => {
    try {
      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("content", content);
      
      if (img) {
        let localUri = img;
        let filename = localUri.split("/").pop();

        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;

        formData.append("img", { uri: localUri, name: filename, type });
      }

      const response = await axios.post("http://192.168.3.169:3000/forum/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.navigate("/page/forum");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <StyledScroll className="flex-1 bg-Main">
      <StyledView className="mt-12">
        {/* arow */}
        <StyledLink to="/page/forum" className="flex h-11 mx-3">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>

        {/* input form */}
        <StyledView className="mx-5 mb-2">
          <StyledInput className="bg-white px-3 rounded-md font-pRegular pb-40 pt-2" placeholder="Diskusikan pertanyaanmu...." style={styles.shadow} value={content} onChangeText={(text) => setContent(text)} />
        </StyledView>
        {/* input foto */}
        <StyledView className="mx-5 mt-5">
          <StyledButton className="mb-2 flex-row justify-between items-center bg-white rounded-md py-3 px-4" style={styles.shadow} onPress={selectIMG}>
            <StyledText className="text-[#2573D5] font-bold text-lg font-pRegular">
              Tambagkan Gambar
              <StyledText className="text-rose-500 text-[9px]">(OPSIONAL)</StyledText>
            </StyledText>

            <Fontisto name="picture" size={30} color="#2573D5" />
          </StyledButton>
          {img && <StyledImage source={{ uri: img }} className="w-20 h-40" />}
        </StyledView>
        {/* button submit */}
        <StyledView className="mx-5 mt-5 mb-2">
          <StyledButton onPress={handelPost} className="mb-2 flex-row justify-center items-center bg-[#2573D5] rounded-md py-3 px-4" style={styles.shadow}>
            <StyledText className="text-white font-bold text-lg font-pRegular">POSTING</StyledText>
          </StyledButton>
        </StyledView>
      </StyledView>
    </StyledScroll>
  );
};

export default createforum;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
