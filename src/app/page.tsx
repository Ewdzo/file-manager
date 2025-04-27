import { DefaultScreen } from "./components/screens";
import SetupScreen from "./components/screens/variations/setup";

export default function Home() {
  return (
    <DefaultScreen>
      <SetupScreen />
      {/* <WelcomeScreen /> */}
    </DefaultScreen >
  );
}
