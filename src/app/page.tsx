import { DefaultScreen } from "./components/screens";
import WelcomeScreen from "./components/screens/variations/welcome";

export default function Home() {
  return (
    <DefaultScreen>
      {/* <SetupScreen /> */}
      <WelcomeScreen />
    </DefaultScreen >
  );
}
