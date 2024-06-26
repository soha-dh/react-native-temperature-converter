import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./app.style";
import { Text, View, ImageBackground } from "react-native";
import hotBackground from "./assets/hot.png";
import coldBackground from "./assets/cold.png";
import { Input } from "./components/input/Input";
import { useState, useEffect } from "react";
import { DisplayTemperature } from "./components/DisplayTemperature/DisplayTemperature";

import {
  UNITS,
  convertTemperatureTo,
  getOppositeUnit,
  isIceTemperature,
} from "./utils/temperature";
import { ButtonConvert } from "./components/ButtonConvert/ButtonConvert";

export default function App() {
  const [inputValue, setInputValue] = useState(0);
  const [currentUnit, setCutrentUnit] = useState("°C");
  const oppositeUnit = getOppositeUnit(currentUnit);
  const [currentBackground, setCurrentBackground] = useState(coldBackground);

  useEffect(() => {
    if (isIceTemperature(inputValue, currentUnit)) {
      setCurrentBackground(coldBackground);
    } else {
      setCurrentBackground(hotBackground);
    }
  }, [inputValue, currentUnit]);

  function getConvertedTemperature() {
    if (isNaN(inputValue)) {
      return "";
    } else {
      return convertTemperatureTo(inputValue, oppositeUnit).toFixed(1);
    }
  }

  return (
    <ImageBackground style={s.backgroundImg} source={currentBackground}>
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
            <ButtonConvert
              onPress={() => {
                setCutrentUnit(oppositeUnit);
              }}
              unit={currentUnit}
            />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </ImageBackground>
  );
}
