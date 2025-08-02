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
import { default as BaseIcon } from 'react-native-ionicons' 
import defaultTheme from './Theme'

import PropTypes from 'prop-types';

// TODO: FIXME
const HaveNoIdeaWhyThisIsNeeded=3
/*
const SelectLabel = styled.Text`
  font-size: ${props => props.myTheme.BaseInput.fontSize};
  flex:1;
`
*/
class SelectLabel extends Component {
  render(){
    let props=this.props;
    return (
      <Text style={{
        fontSize: props.myTheme.BaseInput.fontSize,
        flex:1
      }}  {...this.props}>{ this.props.children }</Text>
    )
  }
}
SelectLabel.defaultProps = {
  myTheme: defaultTheme
}
/*
const LabelIconWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction:row;
  height: ${props => props.inlineLabel ? props.myTheme.FormGroup.height - props.myTheme.FormGroup.borderWidth*2 : props.myTheme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded};
`
*/
class LabelIconWrapper extends Component {
  render(){
    let props=this.props;
    return (
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        height: props.inlineLabel ? props.myTheme.FormGroup.height - props.myTheme.FormGroup.borderWidth*2 : props.myTheme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded
      }}  {...this.props}>{ this.props.children }</View>
    )
  }
}
LabelIconWrapper.defaultProps = {
  myTheme: defaultTheme
}
/*
const SelectWrapper = styled.View`
  flex: ${props => props.inlineLabel ? .5 : 1};
  height: ${props => props.inlineLabel ? props.myTheme.FormGroup.height - props.myTheme.FormGroup.borderWidth*2 : props.myTheme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded};
`
*/
class SelectWrapper extends Component {
  render(){
    let props=this.props;
    return (
      <View style={{
        flex:  props.inlineLabel ? .5 : 1,
        height:  props.inlineLabel ? props.myTheme.FormGroup.height - props.myTheme.FormGroup.borderWidth*2 : props.myTheme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded
      }}  {...this.props}>{ this.props.children }</View>
    )
  }
}
SelectWrapper.defaultProps = {
  myTheme: defaultTheme
}

// const Icon = styled(BaseIcon)`
//   height:10;
//   width:10;
// `
//const Icon=<BaseIcon height="10" width="10"/>
/*
const SelectPlaceholder = styled.Text`
  color: ${props => props.myTheme.BaseInput.placeholderColor};
`
*/
class SelectPlaceholder extends Component {
  render(){
    let props=this.props;
    return (
      <Text style={{
        color: props.myTheme.BaseInput.placeholderColor,
      }}  {...this.props}>{ this.props.children }</Text>
    )
  }
}
SelectPlaceholder.defaultProps = {
  myTheme: defaultTheme
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
        <SelectWrapper inlineLabel={inlineLabel} myTheme={theme}>
          <TouchableOpacity onPress={()=>{onSelectAction(this.setValueAndLabel.bind(this))}}>
            <LabelIconWrapper inlineLabel={inlineLabel}>
              <SelectLabel inlineLabel={inlineLabel}>{ label }</SelectLabel>
              <BaseIcon name="arrow-dropright" size={20}/>
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
