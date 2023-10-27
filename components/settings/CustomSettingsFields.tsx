import DataCollectionField from './DataCollectionField';
import DataNameField from './DataNameField';
import LocationField from './LocationField';
import MonthField from './MonthField';
import SeasonField from './SeasonField';
import YearField from './YearField';

function CustomSettingsFields() {
  return (
    <section className="py-4">
      <div className="flex justify-between gap-4">
        <LocationField />
        <DataNameField />
      </div>
      <div className="flex justify-between gap-4">
        <DataCollectionField />
      </div>
      <div className="flex justify-between gap-4">
        <SeasonField />
        <YearField />
        <MonthField />
      </div>
    </section>
  );
}

export default CustomSettingsFields;
