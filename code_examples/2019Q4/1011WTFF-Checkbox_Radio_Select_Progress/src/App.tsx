import React, { ChangeEvent, useState } from 'react';
import './App.scss';
import { Checkbox } from './components/Checkbox/Checkbox';
import { RadioButton } from './components/RadioButton/RadioButton';
import { flavour, language_options, Language_Option } from './data';
import { Select } from './components/Select/Select';
import { Progress } from './components/Progress/Progress';

const App: React.FC = () => {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [flavourRadioChecked, setFlavourRadioChecked] = useState<keyof typeof flavour | undefined>(undefined);
  const [selectedLanguage, setLanguage] = useState<Language_Option | undefined>();
  
  const handleCheckboxChange = () => { setCheckboxChecked(!checkboxChecked); };

  const handleFlavourRadioChange = (e: ChangeEvent<HTMLInputElement>) => { setFlavourRadioChecked(e.target.value as keyof typeof flavour); };

  const handleSelectedLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (language_options.includes(selectedValue as Language_Option)) {
      setLanguage(selectedValue as Language_Option);
    }
    // TODO: Is there a clearer and safer way of doing this?
  };

  return (
    <div className="App">
      <div>
        <Checkbox checked={checkboxChecked} onChange={handleCheckboxChange}>
          Loud
        </Checkbox>
      </div>

      <fieldset>
        <legend>Choose your flavour</legend>

        <RadioButton name="flavour" checked={flavourRadioChecked === flavour.vanilla} onChange={handleFlavourRadioChange}>
          {flavour.vanilla}
        </RadioButton>

        <RadioButton name="flavour" checked={flavourRadioChecked === flavour.chocolate} onChange={handleFlavourRadioChange}>
          {flavour.chocolate}
        </RadioButton>
      </fieldset>

      <label htmlFor='language_select'>Choose a language</label>
      <div>
        <Select id='language_select' options={language_options} value={selectedLanguage} onChange={handleSelectedLanguageChange} inline/>
      </div>

      <Progress value={75}/>

      <Progress value={100}/>
    </div>
  );
}

export default App;
