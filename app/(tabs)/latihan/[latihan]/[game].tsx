import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity, Button } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import * as FileSystem from "expo-file-system";

// icon
import { Entypo, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import axios from "axios";
import { CameraView, useCameraPermissions } from "expo-camera";

const StyledText = styled(Text);
const StyledView = styled(View);
const StyledLink = styled(Link);
const StyledScroll = styled(ScrollView);
const StyledButton = styled(TouchableOpacity);
const StyledCamera = styled(CameraView);

const game = () => {
  const { latihan, game } = useLocalSearchParams();

  const [data, setData] = useState("");
  const getDataById = async () => {
    try {
      const datas = await axios.get(`http://192.168.3.169:3000/module/getDataById/${game}`);
      setData(datas.data.payload.kata);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDataById();
  }, [game]);

  // camera
  const [facing, setFacing] = useState<"front" | "back">("back");
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [capturing, setCapturing] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // hasil translate
  const [textTranslate, setTextTranslate] = useState("");

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <StyledView className="flex-1 justify-center">
        <Text style={{ textAlign: "center" }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </StyledView>
    );
  }

  // get capture

  const takePicture = async () => {
    console.log("Sending image to server...");
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ exif: false, quality: 1, base64: true });
      if (photo && photo.uri) {
        const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: "base64" });
        translateSign(base64);
      } else {
        console.error("Error capturing photo: photo or photo.uri is undefined");
      }
    }
  };

  const translateSign = async (base64Image: any) => {
    try {
      const response = await axios.post(
        "http://192.168.3.169:5000/",
        {
          image: base64Image,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;
      if (result.className.toLowerCase() === data.toLowerCase()) {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setCapturing(false);
        }
      }
      console.log("Hasil Terjemahan", result.className);
    } catch (error) {
      console.error("Error translating sign:", error);
    }
  };

  const autoCapture = () => {
    if (capturing) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    } else {
      intervalRef.current = setInterval(() => {
        takePicture();
      }, 5000);
    }
    setCapturing(!capturing);
  };

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  return (
    <StyledScroll className="flex-1 bg-Main">
      <StyledView className="mt-12 mx-5">
        {/* arow */}
        <StyledLink to={`/latihan/${latihan}`} className="flex h-11 -ml-2">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>

        {/* camera */}
        <StyledCamera className="flex-1" facing={facing} ref={cameraRef}>
          <StyledView className="flex-1 flex-row bg-transparent mt-[90%]">
            <StyledButton className="flex-row justify-end items-center" onPress={toggleCameraFacing}>
              <FontAwesome6 name="camera-rotate" size={28} color="white" />
            </StyledButton>
          </StyledView>
        </StyledCamera>

        <StyledButton className="bg-ButtonBG mx-auto h-14 w-14 mt-2 rounded-full flex items-center justify-center" onPress={autoCapture}>
          <FontAwesome5 name="camera" size={28} color="white" />
        </StyledButton>
        {/* box taks */}
        <StyledView className="bg-white flex-row items-center py-3 px-5 rounded-md mb-7" style={styles.shadow}>
          <FontAwesome6 name="clipboard-list" size={30} color="black" />
          {data ? <StyledText className="ml-7 font-pRegular text-Main font-bold text-base">Buatlah Kata “{data}“</StyledText> : <StyledText></StyledText>}
        </StyledView>
        {/* box jawaban */}
        <StyledView className="bg-white py-3 rounded-md mb-5" style={styles.shadow}>
          <StyledText className="ml-7 font-pRegular text-Main font-bold text-base">Jawaban :</StyledText>
          <StyledText className="uppercase text-[#CECECE] mx-auto text-5xl font-pRegular font-semibold mt-6 mb-4">{data ? data : ""}</StyledText>
        </StyledView>

        {/* button pelajari lagi */}
        <StyledButton className="bg-[#2573D5] py-3 rounded-md" onPress={() => router.push(`/listModule/${latihan}`)}>
          <StyledText className="text-white mx-auto font-bold text-xl">Pelajari Lagi</StyledText>
        </StyledButton>
        {/* end */}
      </StyledView>
    </StyledScroll>
  );
};

export default game;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
});
