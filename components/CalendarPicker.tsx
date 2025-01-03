import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import Button from "./Button";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SetStateAction, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "@/theme/theme";


type Props = {
  setState: React.Dispatch<SetStateAction<string>>
}
export const CalendarPicker = ({ setState }: Props) => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setState(currentDate)
    setShow(true);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <SafeAreaView>



      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour={true}
        onChange={onChange}

      />

    </SafeAreaView>
  );
};