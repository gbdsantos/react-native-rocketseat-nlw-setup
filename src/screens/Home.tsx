import { ScrollView, Text, View } from "react-native";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";

import { generateDatesFromYearBeginning } from '../utils/generate-date-from-year-beginning';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

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

      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          className="flex-row flex-wrap"
        >
          {
            datesFromYearStart.map(date => (
              <HabitDay
                key={date.toISOString()}
              />
            ))
          }

          {
            amountOfDaysToFill > 0 && Array
              .from({ length: amountOfDaysToFill })
              .map((_, index) => (
                <View
                  className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                  key={index}
                  style={{ height: DAY_SIZE, width: DAY_SIZE }}
                />
              ))
          }
        </View>
      </ScrollView>
    </View>
  )
}
