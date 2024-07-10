import { Tabs } from "expo-router";

export default () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="auth/register" />
      <Tabs.Screen name="auth/login" />
      <Tabs.Screen name="page/dashboard" />
    </Tabs>
  );
};
