import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
import axios from "axios";

// icon
import { Entypo, FontAwesome } from "@expo/vector-icons";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledLink = styled(Link);
const StyledScroll = styled(ScrollView);
const StyledButton = styled(TouchableOpacity);
const StyledInput = styled(TextInput);
const StyledImage = styled(Image);

const id = () => {
  const { id } = useLocalSearchParams(); // forum id
  const [user_id, setUserID] = useState(null);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [inputComment, setINputComment] = useState("");
  // get forum id
  useEffect(() => {
    const getData = async () => {
      try {
        if (id) {
          const response = await axios.get(`http://192.168.3.169:3000/forum/getDataForumByID/${id}`);
          setData(response.data.payload);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [id]);

  // cek user id
  const checkUserLogin = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        const result = await axios.post("http://192.168.3.169:3000/user/userInfo", { token: token });
        setUserID(result.data[0].payload[0].id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkUserLogin();
  }, []);

  // get comment
  useEffect(() => {
    const getComment = async () => {
      console.log(user_id);
      console.log(id);
      try {
        const result = await axios.get("http://192.168.3.169:3000/comment/show", {
          params: {
            user_id: user_id,
            forum_id: id,
          },
        });
        setComment(result.data[0].payload);
      } catch (err) {
        console.log(err);
      }
    };
    getComment();
  }, [user_id, id]);

  const handelComment = async () => {
    try {
      const response = await axios.post("http://192.168.3.169:3000/comment/create", { user_id, forum_id: id, content: inputComment });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <StyledView className="flex-1 bg-Main">
      <StyledView className="mx-5 mt-12">
        {/* arow */}
        <StyledLink to="/page/forum" className="flex h-11">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>

        {/* pertanyaan */}
        <StyledView className="bg-white py-3 rounded-lg mb-7" style={styles.shadow}>
          {/* username and icon */}
          <StyledView className="flex-row items-center mb-3 ml-3">
            <FontAwesome name="user-circle" size={30} color="#4C4C4E" />
            <StyledText class Name="mx-2 font-bold text-base font-pRegular">
              {data.nama}
            </StyledText>
          </StyledView>
          {/* image */}

          <StyledView className="mx-5 mt-3 mb-3">{data.image ? <StyledImage source={{ uri: data.image }} className="w-full h-40" /> : null}</StyledView>
          {/* isi content */}
          <StyledView className="mx-5 mb-5">
            <StyledText className="text-[13px]">{data.content}</StyledText>
          </StyledView>
        </StyledView>
        {/* comment */}
        <StyledView className="mx-auto">
          <StyledText className="font-pRegular text-base font-bold">Komentar {id}</StyledText>
        </StyledView>

        {/* end */}
      </StyledView>
      {/* box comment user */}
      <StyledScroll>
        {comment.map((item, i) => (
          <StyledView key={i} className="flex-row mt-7 max-w-full mb-3 mx-5">
            <FontAwesome name="user-circle" size={30} color="#4C4C4E" />
            {/* box */}
            <StyledView className="bg-white py-2 ml-3 rounded-lg" style={[styles.shadow, styles.container]}>
              <StyledView className="flex-row items-center mb-3 ml-4">
                <StyledText className="font-bold text-base font-pRegular">{item.nama}</StyledText>
              </StyledView>
              {/* isi content */}
              <StyledView className="mb-5 w-[86%] mx-4">
                <StyledText className="text-[12px] font-pRegular text-Main">{item.comment}</StyledText>
              </StyledView>
            </StyledView>
          </StyledView>
        ))}
      </StyledScroll>
      {/* Input comment */}
      <StyledView className="items-center mx-6 flex-col justify-between mb-5">
        <StyledView className="flex-row items-center mx-10">
          <StyledInput placeholder="Tambahkan Komentar" className="bg-white rounded-md py-3 w-full pl-3" style={styles.shadow} value={inputComment} onChangeText={(text) => setINputComment(text)} />
          <StyledButton onPress={handelComment} className="bg-[#2573D5] ml-4 px-5 py-3 rounded-md">
            <FontAwesome name="send" size={30} color="white" />
          </StyledButton>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default id;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  container: {
    maxWidth: 400,
    alignSelf: "center",
  },
});
