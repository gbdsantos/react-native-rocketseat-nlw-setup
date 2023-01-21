import { Text, View } from "react-native";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

export function Home() {
  return (
    <View className="flex-1 bg-background px-8 py-16">
      <Header />

      <View className="flex-row mb-2 mt-6">
        {
          weekDays.map((weekDay, index) => (
            <Text
              className="text-zinc-500 text-xl font-bold text-center mx-1"
              key={`${weekDay}-${index}`}
              style={{ width: DAY_SIZE }}
            >
              {weekDay}
            </Text>
          ))
        }
      </View>
      <HabitDay />
    </View>
  )
}
