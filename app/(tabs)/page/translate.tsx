import { View, Text, ScrollView, SafeAreaView, StyleSheet, Button, TouchableOpacity, Alert } from "react-native";
import React, { useRef, useState } from "react";
import { styled } from "nativewind";
import { Link } from "@react-navigation/native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system";

// nativewind
const StyledText = styled(Text);
const StyledView = styled(View);
const StyledLink = styled(Link);
const StyledScroll = styled(ScrollView);
const StyledSafeArea = styled(SafeAreaView);
const StyledCamera = styled(CameraView);
const StyledButton = styled(TouchableOpacity);

// icon
import { Entypo } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

// logic
const translate = () => {
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
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.5, base64: true, exif: false });
      if (photo && photo.uri) {
        const base64 = await FileSystem.readAsStringAsync(photo.uri, { encoding: "base64" });
        translateSign(base64);
        console.log("Photo captured:", photo.uri);
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
      setTextTranslate((prevText) => prevText + " " + result.className);

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
    <StyledSafeArea className="flex-1 bg-Main">
      <StyledScroll className="mt-12">
        {/* arow */}
        <StyledLink to="/page/dashboard" className="flex h-11 mx-3">
          <Entypo name="chevron-thin-left" size={30} color="black" />
        </StyledLink>

        {/* camera */}
        <StyledView className="flex-1 justify-center mx-3">
          <StyledCamera className="flex-1" facing={facing} ref={cameraRef}>
            <StyledView className="flex-1 flex-row bg-transparent mt-[90%]">
              <StyledButton className="flex-row justify-end items-center" onPress={toggleCameraFacing}>
                <FontAwesome6 name="camera-rotate" size={28} color="white" />
              </StyledButton>
            </StyledView>
          </StyledCamera>
        </StyledView>

        {/* option */}
        <StyledView className="flex-row mb-4 mx-5 justify-center mt-12">
          {/* buton duration */}
          <StyledView>
            <StyledText className="text-[#CECECE] font-semibold items-center font-pRegular">Delay:</StyledText>
            <StyledView className="w-[109px] bg-white py-1 rounded-[4px] mt-1" style={styles.shadow}>
              <StyledButton className="flex-row justify-between px-2 items-center mb-1 mt-1">
                <StyledText className="text-Main font-bold text-base font-pRegular">3s</StyledText>
                <Fontisto name="clock" size={22} color="#CECECE" />
              </StyledButton>
            </StyledView>
          </StyledView>

          {/* captute button */}
          <StyledButton className="bg-ButtonBG mx-auto h-14 w-14 mt-2 rounded-full flex items-center justify-center" onPress={autoCapture}>
            <FontAwesome5 name="camera" size={28} color="white" />
          </StyledButton>

          {/* buton select bahasa */}
          <StyledView>
            <StyledText className="text-[#CECECE] font-semibold font-pRegular">Pilih Bahasa:</StyledText>
            <StyledView className="w-[109px] bg-white py-1 rounded-[4px] mt-1" style={styles.shadow}>
              <StyledButton className="flex-row justify-between px-2 items-center mb-1 mt-1">
                <StyledText className="text-Main font-bold text-base font-pRegular">BISINDO</StyledText>
                <MaterialIcons name="change-circle" size={22} color="#CECECE" />
              </StyledButton>
            </StyledView>
          </StyledView>
        </StyledView>

        {/* Hasil Temerjemah */}
        <StyledView className="w-full bg-white mt-8 h-64">
          <StyledView className="mx-5 py-2">
            <StyledText className="font-bold text-base text-Main font-pRegular">Hasil Terjemahan :</StyledText>
            <StyledView className="border-b border-[#CECECE] mt-1 mb-[2px]"></StyledView>
          </StyledView>
          <StyledScroll className="mx-5 mb-3">
            <StyledText className="text-sm font-pRegular">{textTranslate}</StyledText>
          </StyledScroll>
        </StyledView>
      </StyledScroll>
    </StyledSafeArea>
  );
};

export default translate;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
});
