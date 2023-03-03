import React, { useState } from 'react';
import { Button, SearchContainer, TextInput } from './elements';

type Props = {
  onSubmit: (value: string) => void;
};

export default function SearchInput(props: Props) {
  const [inputValue, setInputValue] = useState('');
  const onChangeText = (value: string) => {
    setInputValue(value);
  };
  return (
    <>
      <SearchContainer className="flex flex-row justify-evenly w-full px-3">
        <TextInput
          className="border border-gray-300 text-gray-900 text-sm rounded-full block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          onChange={(env) => onChangeText(env.target.value)}
          value={inputValue}
        />
        <Button
          type="submit"
          className="text-white rounded-full focus:outline-none text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          onClick={() => props.onSubmit(inputValue)}
        >
          SEARCH
        </Button>
      </SearchContainer>
    </>
  );
}
