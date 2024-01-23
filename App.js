import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./ui/app/RootNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
