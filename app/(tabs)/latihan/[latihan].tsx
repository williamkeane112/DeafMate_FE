import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Link } from "@react-navigation/native";
import { styled } from "nativewind";

// icon
import { Entypo, FontAwesome6 } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledLink = styled(Link);
const StyledScroll = styled(ScrollView);
const StyledImage = styled(Image);

const latihan = () => {
  const { latihan } = useLocalSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const datas = await axios.post("http://192.168.3.169:3000/module/getData", { latihan });
        setData(datas.data[0].payload);
      } catch (err) {
        console.log("error goblok: " + err);
      }
    };
    getData();
  }, [latihan]);
  return (
    <StyledScroll className="flex-1 bg-Main">
      <StyledView className="mx-5 mt-12">
        {/* arow */}
        <StyledLink to={`/listModule/${latihan}`} className="flex h-11 -ml-2">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>

        <StyledView className="flex-row justify-between items-center mb-10">
          <StyledText className="font-bold text-2xl font-pRegular">Latihan</StyledText>
          <StyledView className="flex-row items-center justify-between border border-[#CECECE] w-20 px-2 bg-white py-[5px] rounded-md">
            <StyledImage source={require("../../../assets/icon/coin.png")} className="w-[15px] h-[14.6px]" />
            <StyledText className="text-Main font-semibold font-pRegular text-base">1200</StyledText>
          </StyledView>
        </StyledView>

        {data.map((item, i) => (
          <StyledLink to={`/latihan/${latihan}/${item.id}`} key={i} className="bg-white rounded-lg py-8 px-5 mb-7" style={styles.shadow}>
            <StyledView className="flex-row items-center">
              <FontAwesome6 name="clipboard-list" size={40} color="#29304D" />
              <StyledText className="text-2xl font-bold font-pRegular text-Main ml-10">{item.kata}</StyledText>
            </StyledView>
          </StyledLink>
        ))}
      </StyledView>
    </StyledScroll>
  );
};

export default latihan;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
