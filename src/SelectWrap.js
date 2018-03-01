import  React,{ Component } from 'react'
import {
  Modal,
  Picker,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
import styled from 'styled-components/native'
import { default as BaseIcon } from 'react-native-vector-icons/Ionicons';
import defaultTheme from './Theme'

import PropTypes from 'prop-types';

// TODO: FIXME
const HaveNoIdeaWhyThisIsNeeded=3

const SelectLabel = styled.Text`
  font-size: ${props => props.theme.BaseInput.fontSize};
  flex:1;
`

SelectLabel.defaultProps = {
  theme: defaultTheme
}

const LabelIconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction:row;
  height: ${props => props.inlineLabel ? props.theme.FormGroup.height - props.theme.FormGroup.borderWidth*2 : props.theme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded};
`

LabelIconWrapper.defaultProps = {
  theme: defaultTheme
}

const SelectWrapper = styled.View`
  flex: ${props => props.inlineLabel ? .5 : 1};
  height: ${props => props.inlineLabel ? props.theme.FormGroup.height - props.theme.FormGroup.borderWidth*2 : props.theme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded};
`

SelectWrapper.defaultProps = {
  theme: defaultTheme
}

const Icon = styled(BaseIcon)`
  height:10;
  width:10;
`

const SelectPlaceholder = styled.Text`
  color: ${props => props.theme.BaseInput.placeholderColor};
`

SelectPlaceholder.defaultProps = {
  theme: defaultTheme
}

class Select extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value,
      valueDesc: props.valueDesc
    }
    this.onValueChange = this.onValueChange.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.onValueChange(nextProps.value)
    }
  }
  onValueChange(newValue) {
    this.setState({
      value: newValue
    }, () => {
      this.props.onValueChange(newValue)
    })
  }
  setValueAndLabel(value,label){
    this.onValueChange(value)
    this.setState({valueDesc: label})
  }

  render() {
    const {
      inlineLabel,
      labelKey,
      onValueChange,
      placeholder,
      valueKey,
      theme,
      onSelectAction,
      ...rest
    } = this.props

    let label = <SelectPlaceholder>{ placeholder }</SelectPlaceholder>
    if (this.state.valueDesc!=undefined&&this.state.valueDesc!=''){
      label=this.state.valueDesc
    }
      return (
        <SelectWrapper inlineLabel={inlineLabel} theme={theme}>
          <TouchableOpacity onPress={()=>{onSelectAction(this.setValueAndLabel.bind(this))}}>
            <LabelIconWrapper inlineLabel={inlineLabel}>
              <SelectLabel inlineLabel={inlineLabel}>{ label }</SelectLabel>
              <Icon name="ios-arrow-forward" />
            </LabelIconWrapper>
          </TouchableOpacity>
        </SelectWrapper>
      )
  }
}

Select.ThePropTypes = {
  labelKey: PropTypes.string,
  placeholder: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.array,
  valueKey: PropTypes.string,
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number
  ]),
//  customModalPicker:PropTypes.element,
  multiSelect:PropTypes.bool
}

Select.defaultProps = {
  componentName: 'Select',
  onValueChange: () => {},
  placeholder: '',
  labelKey: 'label',
  valueKey: 'value',
//  value: '',
  multiSelect: false
}

export default Select
