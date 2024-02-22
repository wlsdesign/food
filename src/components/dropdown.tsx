import React from 'react';
import { SelectList, SelectListProps } from "react-native-dropdown-select-list"
import FontAwesome from '@expo/vector-icons/build/FontAwesome';

export function Dropdown({ save, placeholder, ...rest }: SelectListProps) {
  return (
    <SelectList
      save={save}
      inputStyles={{ color: 'white' }}
      boxStyles={{ marginBottom: 20 }}
      dropdownStyles={{ borderColor: 'white', marginBottom: 20, marginTop: -5 }}
      dropdownTextStyles={{ color: 'white', }}
      placeholder={placeholder}
      arrowicon={<FontAwesome name="chevron-down" size={18} color={'white'} />}
      search={false}
      {...rest}
    />
  )
}