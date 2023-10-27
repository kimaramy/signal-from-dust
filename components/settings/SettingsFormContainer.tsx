import { useSettingsState } from './hooks';
import SettingsForm from './SettingsForm';

function SettingsFormContainer() {
  const [settingsData, setSettingsData] = useSettingsState();
  return <SettingsForm values={settingsData} onSubmit={setSettingsData} />;
}

export default SettingsFormContainer;
