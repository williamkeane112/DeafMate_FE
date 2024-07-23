import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { Entypo, FontAwesome, FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledScrol = styled(ScrollView);
const StyledLink = styled(Link);
const StyledInput = styled(TextInput);
const StyledFontAwsome = styled(FontAwesome);

const Listmodul = () => {
  const { isi } = useLocalSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const datas = await axios.post("http://192.168.135.169:3000/module/getData", { isi });
        setData(datas.data[0].payload);
      } catch (err) {
        console.log("error goblok: " + err);
      }
    };
    getData();
  }, [isi]);
  return (
    <StyledScrol className="flex-1 bg-Main">
      <StyledView className="mt-12 mx-5">
        {/* arow */}
        <StyledLink to="/page/module" className="flex h-11 -ml-2">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>

        {/* text and search */}
        <StyledView className="flex-row justify-between items-center">
          <StyledText className="text-Main font-extrabold text-3xl font-pRegular">{isi}</StyledText>
          <StyledLink to={`/latihan/${isi}`}>
            <StyledText>Latihan</StyledText>
          </StyledLink>
        </StyledView>

        <StyledView className="flex-row items-center mb-2 mt-5">
          <StyledFontAwsome name="search" size={24} color="black" className="absolute z-10 mx-2" />
          <StyledInput placeholder="Cari Kategori..." className="bg-white py-2 w-full pl-9 text-sm rounded-lg" style={styles.shadow} />
        </StyledView>

        {/* target */}
        <StyledView className="flex-row items-center mt-3 bg-white py-3 pl-5 rounded-lg mb-10" style={styles.shadow}>
          <FontAwesome6 name="clipboard-list" size={36} color="black" />
          <StyledText className="text-[16px] font-extrabold text-Main ml-2 font-pRegular">0/4</StyledText>
        </StyledView>

        {/* list Item */}
        {data.map((item, i) => (
          <StyledLink to={`/listModule/${isi}/${item.id}`} key={i} className="bg-white rounded-lg py-5 px-5 mb-5" style={styles.shadow}>
            <StyledText className="text-3xl font-bold font-pRegular text-Main">{item.kata}</StyledText>
            <StyledText className="mt-2 text-base font-pRegular text-Main font-bold">{item.desc}</StyledText>
          </StyledLink>
        ))}

        {/* end */}
      </StyledView>
    </StyledScrol>
  );
};

export default Listmodul;
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
