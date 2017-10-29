import React, { Component } from 'react'
import {
  Modal,
  Picker,
  Text,
  TouchableOpacity,
  View,
  StyleSheet
} from 'react-native'
import styled from 'styled-components/native'
import { default as BaseIcon } from 'react-native-vector-icons/Ionicons';
import { ColorPicker,fromHsv } from 'react-native-color-picker'
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
      showSelector: false,
      value: props.value
    }

    this.toggleSelector = this.toggleSelector.bind(this)
    this.onValueChange = this.onValueChange.bind(this)
  }
  newVal='#ffff00'

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.onValueChange(nextProps.value)
    }
  }

  toggleSelector() {
    this.setState({
      showSelector: !this.state.showSelector
    })
  }

  onValueChange(newValue) {
    this.setState({
      showSelector: false,
      value: newValue
    }, () => {
      this.props.onValueChange(newValue)
    })
  }

  leftButtonOnPress(){
    this.toggleSelector();
  }
  rightButtonOnPress(){
    if(this.newVal){
      this.onValueChange(this.newVal)
    }
  }
  onColorChange(value){
    this.newVal=fromHsv(value);
  }

  render() {
    const {
      inlineLabel,
      labelKey,
      onValueChange,
      placeholder,
      valueKey,
      theme,
      customModalPicker,
      multiSelect,
      ...rest
    } = this.props
    const { showSelector, value } = this.state


    let label = <SelectPlaceholder>{ placeholder }</SelectPlaceholder>
    if (value) {
      label=<View style={[styles.valueField,{backgroundColor:value}]}></View>;
    }
     return (
       <SelectWrapper inlineLabel={inlineLabel} theme={theme}>
           <Modal
             onRequestClose={this.toggleSelector}
             visible={showSelector}
           >
             <View style={styles.colorPickerDlg}>
               <View style={styles.bar}>
                 <TouchableOpacity style={styles.button}
                 onPress={this.leftButtonOnPress.bind(this)} >
                    <BaseIcon name={ 'md-close' } size={30} color={'white'} />
                </TouchableOpacity>
                <Text style={{color: 'white'}}>请选择色调、饱和度、亮度，确定颜色</Text>
                <TouchableOpacity style={styles.button}
                  onPress={this.rightButtonOnPress.bind(this)} >
                     <BaseIcon name={ 'md-checkmark' } size={30} color={'white'} />
                </TouchableOpacity>
               </View>

               <ColorPicker
                 oldColor={value?value:'yellow'}
                 onColorChange={this.onColorChange.bind(this)}
            //     onColorSelected={color => alert(`Color selected: ${color}`)}
                 style={{flex: 1}}
               />
             </View>
           </Modal>

         <TouchableOpacity onPress={this.toggleSelector}>
           <LabelIconWrapper inlineLabel={inlineLabel}>
             { label }<SelectLabel inlineLabel={inlineLabel}></SelectLabel>
             <Icon name="ios-arrow-down" />
           </LabelIconWrapper>
         </TouchableOpacity>
       </SelectWrapper>
      )
  }
}

Select.PropTypes = {
  labelKey: PropTypes.string,
  placeholder: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  valueKey: PropTypes.string,
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array
  ]),
  customModalPicker:PropTypes.node,
  multiSelect:PropTypes.bool
}

Select.defaultProps = {
  componentName: 'Select',
  onValueChange: () => {},
  placeholder: '',
  labelKey: 'label',
  valueKey: 'value',
  value: '',
  multiSelect: false
}


var styles = StyleSheet.create({
    button: {
        paddingLeft:20,
        paddingRight:20
    },
    bar:{
      flexDirection:'row',justifyContent:'space-around',alignItems:'center' ,
      marginTop:20,
    },
    valueField:{borderRadius:11,width:22,height:22},
    colorPickerDlg:{flex: 1, paddingBottom: 15, backgroundColor: '#212021'},
    });

export default Select
