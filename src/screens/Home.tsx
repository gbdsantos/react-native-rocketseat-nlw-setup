import { useCallback, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { HabitDay, DAY_SIZE } from "../components/HabitDay";
import { Header } from "../components/Header";
import { Loading } from "../components/Loading";

import { api } from "../lib/axios";
import dayjs from "dayjs";
import { generateDatesFromYearBeginning } from '../utils/generate-date-from-year-beginning';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const datesFromYearStart = generateDatesFromYearBeginning()
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length;

type SummaryProps = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>

export function Home() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<SummaryProps | null>(null)

  const { navigate } = useNavigation();

  async function fetchData() {
    try {
      setLoading(true);
      const response = await api.get('/summary');

      setSummary(response.data);
      console.log(response.data);

    } catch (error) {
      Alert.alert('Ops', 'Não foi possível carregar o sumário de hábitos');

    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => {
    fetchData();
  }, []));

  if (loading) {
    return (<Loading />)
  }

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
        {
          summary &&
          <View
            className="flex-row flex-wrap"
          >
            {
              datesFromYearStart.map(date => {
                const dayWithHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                });

                return (
                  <HabitDay
                    amountCompleted={dayWithHabits?.completed}
                    amountOfHabits={dayWithHabits?.amount}
                    date={date}
                    key={date.toISOString()}
                    onPress={() => navigate('habit', { date: date.toISOString() })}
                  />
                )
              })
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
        }
      </ScrollView>
    </View>
  )
}
