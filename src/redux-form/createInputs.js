import React from 'react'
import { Text, View } from 'react-native'
import {
  Field
} from 'redux-form/immutable'
import {
  Input as InputRenderer,
  Select as SelectRenderer,
  Switch as SwitchRenderer,
  ColorSelect as ColorSelectRenderer,
  SelectWrap as SelectWrapRenderer
} from '../../index'

const createInputs = inputCreator => {
  const renderInput = ({ input: { onChange, ...restInput }, placeholder,onBarCodeScannerClick}) => (
    <InputRenderer onChangeText={onChange} placeholder={placeholder} onBarCodeScannerClick={onBarCodeScannerClick} {...restInput} />
  )
  const Input = inputCreator('Input', renderInput, InputRenderer.propTypes, InputRenderer.defaultProps)

  const renderSelect = ({ input: { onChange, value }, labelKey, valueKey, options, placeholder,customModalPicker,multiSelect,addItemFunc }) => (
    <SelectRenderer
      labelKey={labelKey}
      options={options}
      onValueChange={onChange}
      placeholder={placeholder}
      value={value}
      valueKey={valueKey}
      customModalPicker={customModalPicker}
      multiSelect={multiSelect}
      addItemFunc={addItemFunc}
    />
  )
  const Select = inputCreator('Select', renderSelect, SelectRenderer.ThePropTypes, SelectRenderer.defaultProps)

  const renderSwitch = ({ input: { onChange, value }}) => {
    // redux-form default value is '', however Switch must take a boolean value
    if (value === '') {
      value = SwitchRenderer.defaultProps.value
    }

    return <SwitchRenderer onValueChange={onChange} value={value} />
  }
  const Switch = inputCreator('Switch', renderSwitch, SwitchRenderer.ThePropTypes, SwitchRenderer.defaultProps)

  const renderColorSelect = ({ input: { onChange, value }, valueKey, placeholder }) => (
      <ColorSelectRenderer
        onValueChange={onChange}
        placeholder={placeholder}
        value={value}
      />
    )
  const ColorSelect = inputCreator('ColorSelect', renderColorSelect, ColorSelectRenderer.ThePropTypes, ColorSelectRenderer.defaultProps)

  const renderSelectWrap = ({ input: { onChange, value }, valueKey, placeholder,onSelectAction,valueDesc }) => (
      <SelectWrapRenderer
        onValueChange={onChange}
        placeholder={placeholder}
        onSelectAction={onSelectAction}
        valueDesc={valueDesc}
        value={value}
      />
    )
  const SelectWrap = inputCreator('SelectWrap', renderSelectWrap, SelectWrapRenderer.ThePropTypes, SelectWrapRenderer.defaultProps)



  return {
    Input,
    Select,
    Switch,
    ColorSelect,
    SelectWrap
  }
}

export default createInputs
