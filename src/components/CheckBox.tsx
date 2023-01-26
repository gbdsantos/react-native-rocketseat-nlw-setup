import {
  Text,
  TouchableOpacity,
  TouchableHighlightProps,
  View
} from "react-native";
import Animated, {
  ZoomIn,
  ZoomOut
} from "react-native-reanimated";

import { Feather } from '@expo/vector-icons';
import colors from "tailwindcss/colors";

interface Props extends TouchableHighlightProps {
  checked?: boolean;
  title: string;
}

export function CheckBox({ checked = false, title, ...rest }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {
        checked
          ?
          <Animated.View
            className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
            entering={ZoomIn}
            exiting={ZoomOut}
          >
            <Feather
              color={colors.white}
              name="check"
              size={20}
            />
          </Animated.View>
          :
          <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      }

      <Text className="text-white text-base ml-3 font-semibold">
        {title}
      </Text>
    </TouchableOpacity>
  )
}
