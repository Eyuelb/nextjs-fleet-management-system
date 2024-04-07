'use client';

import { useEffect, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';
import { TextInput } from '@mantine/core';

type GlobalFilterInputProps = {
  value: string;
  onChange: (value: string) => void;
  label?:any
};
function GlobalFilterInput({ value, onChange,label="" }: GlobalFilterInputProps) {
  const [elementValue, setElementValue] = useState(value);
  const [debounced] = useDebouncedValue(elementValue, 1000);

  useEffect(() => {
    onChange(debounced);
  }, [debounced]);

  return (
    <TextInput
      label={label}
      p={10}
      maw={200}
      value={elementValue}
      onChange={(event) => setElementValue(event.currentTarget.value)}
    />
  );
}

export default GlobalFilterInput;
