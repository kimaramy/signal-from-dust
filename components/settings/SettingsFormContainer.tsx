import { useSettingsState } from './hooks';
import SettingsForm from './SettingsForm';

function SettingsFormContainer() {
  const { defaultSettingsData, settingsData, setSettingsData } =
    useSettingsState();

  return (
    <SettingsForm
      defaultValues={defaultSettingsData}
      values={settingsData}
      onSubmit={setSettingsData}
    />
  );
}

export default SettingsFormContainer;
