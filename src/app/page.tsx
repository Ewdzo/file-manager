import { DefaultScreen } from "./components/screens";
import SetupScreen from "./components/screens/variations/setup";
import WelcomeScreen from "./components/screens/variations/welcome";
import { isSetUp } from "./helper/isSetUp";

export default function Home() {
  return (
    <DefaultScreen>
      { isSetUp() ?
        <WelcomeScreen /> :
        <SetupScreen />
      }
    </DefaultScreen >
  );
}
