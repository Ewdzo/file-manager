import { DefaultScreen } from "./components/defaultScreen";
import WelcomeScreen from "./components/screens/variations/welcome";

export default function Home() {
  return (
    <DefaultScreen>
      {/* <SetupScreen /> */}
      <WelcomeScreen />
    </DefaultScreen >
  );
}
