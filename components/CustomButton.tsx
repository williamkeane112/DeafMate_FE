import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { styled } from "nativewind";

const CustomButton = ({title, handlePress, styleButton, textStyle}) => {
  const StyledButton = styled(TouchableOpacity);
  const StyledText = styled(Text);
  return (
    <StyledButton 
    onPress={handlePress}
    className={` py-3 text-center rounded-lg ${styleButton}`}>
      <StyledText className={`text-xl font-semibold text-center ${textStyle}`}>{title}</StyledText>
    </StyledButton>
  );
};

export default CustomButton;
