import { DefaultScreen } from "./components/defaultScreen";
import SetupScreen from "./components/screens/variations/setup";

export default function Home() {
  return (
    <DefaultScreen>
      <SetupScreen />
    </DefaultScreen >
  );
}
