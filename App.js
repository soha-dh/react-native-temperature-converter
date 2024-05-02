import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./app.style";
import { Text, View, ImageBackground } from "react-native";
import hotBackground from "./assets/hot.png";
import { Input } from "./components/input/Input";
import { useState } from "react";
import { DisplayTemperature } from "./components/DisplayTemperature/DisplayTemperature";
import {
  UNITS,
  convertTemperatureTo,
  getOppositeUnit,
} from "./utils/temperature";

export default function App() {
  const [inputValue, setInputValue] = useState(0);
  const [currentUnit, setCutrentUnit] = useState("°C");
  const oppositeUnit = getOppositeUnit(currentUnit);

  function getConvertedTemperature() {
    if (isNaN(inputValue)) {
      return "";
    } else {
      return convertTemperatureTo(inputValue, oppositeUnit).toFixed(1);
    }
  }

  return (
    <ImageBackground style={s.backgroundImg} source={hotBackground}>
      <SafeAreaProvider>
        <SafeAreaView style={s.root}>
          <View style={s.workspace}>
            <DisplayTemperature
              unit={oppositeUnit}
              temperature={getConvertedTemperature()}
            />
            <Input
              unit={currentUnit}
              onChange={setInputValue}
              defaultValue={0}
            />
            <Text>Button</Text>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}