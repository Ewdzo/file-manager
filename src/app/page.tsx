import { DefaultScreen } from "./components/screens";
import SetupScreen from "./components/screens/variations/setup";
import WelcomeScreen from "./components/screens/variations/welcome";
import { checkSetup } from "./helper/check";

export default function Home() {
  return (
    <DefaultScreen>
      { checkSetup() ?
        <WelcomeScreen /> :
        <SetupScreen />
      }
    </DefaultScreen >
  );
}
