import { Tabs, SplashScreen } from "expo-router";

export default () => {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarStyle: { display: "none" } }}>
      <Tabs.Screen name="index" />
      <Tabs.Screen name="auth/register" />
      <Tabs.Screen name="auth/login" />
      <Tabs.Screen name="page/dashboard" />
      <Tabs.Screen name="page/translate" />
      <Tabs.Screen name="page/module" /> 
      <Tabs.Screen name="listModule/[isi]" /> 
      <Tabs.Screen name="listModule/[isi]/[belajar]" /> 
      <Tabs.Screen name="page/tospeech" /> 
      <Tabs.Screen name="latihan/[latihan]" />
      <Tabs.Screen name="latihan/[latihan]/[game]" />
      {/* <Tabs.Screen name="page/forum" />
      <Tabs.Screen name="page/createforum" />
      <Tabs.Screen name="forum/[id]" /> */}
    </Tabs>
  );
};
