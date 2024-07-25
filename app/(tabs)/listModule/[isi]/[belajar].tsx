import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledScrol = styled(ScrollView);
const StyledLink = styled(Link);
const StyledImage = styled(Image);
const StyledButton = styled(TouchableOpacity);
const StyledFontAwesome6 = styled(FontAwesome6);

const belajar = () => {
  const { isi,belajar } = useLocalSearchParams();
  const [data, setData] = useState(null);
  const getDataById = async () => {
    try {
      const datas = await axios.get(`http://192.168.3.169:3000/module/getDataById/${belajar}`);
      setData(datas.data.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataById();
  }, [belajar]);
  return (
    <StyledScrol className="flex-1 bg-Main">
      <StyledView className="mt-12 mx-5">
        {/* arow */}
        <StyledLink to={`/listModule/${isi}`} className="flex h-11 -ml-2">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>

        {data ? (
          <StyledView className="">
            {/* image gif */}
            <StyledImage source={{ uri: data.videos }} className="w-full h-[40vh] mb-10" />
            {/* // box desc  */}
            <StyledView className="bg-white py-2 h-40 px-2 rounded-lg mb-7" style={styles.shadow}>
              <StyledText className="font-extrabold text-lg font-pRegular">Deskripsi :</StyledText>
              <StyledText className="mt-1 font-bold text-sm font-pRegular">{data.desc}</StyledText>
            </StyledView>
          </StyledView>
        ) : (
          <StyledText>No data</StyledText>
        )}

        {/* box */}
        <StyledButton onPress={() => router.push(`/latihan/${isi}`)} className="bg-[#2573D5] py-3 px-5 rounded-md">
          <StyledView className="flex-row items-center">
            <StyledFontAwesome6 name="clipboard-list" size={36} color="white" className="" />
            <StyledText className="text-white text-xl font-bold ml-16 font-pRegular">Kerjakan Latihan</StyledText>
          </StyledView>
        </StyledButton>
        {/* end */}
      </StyledView>
    </StyledScrol>
  );
};

export default belajar;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
