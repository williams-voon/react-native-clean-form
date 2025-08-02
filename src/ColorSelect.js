import React, { Component } from 'react'
import {
  Modal,
  Picker,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions, 
  Platform 
} from 'react-native'
import styled from 'styled-components/native'
import { default as BaseIcon }  from 'react-native-ionicons' 
import { ColorPicker,fromHsv } from 'react-native-color-picker'
import defaultTheme from './Theme'

const height = Dimensions.get('window').height
const isIphoneX=(Platform.OS === 'ios' &&
  !Platform.isPad &&
  !Platform.isTVOS &&
  height === 812)
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
        height: props.inlineLabel ? props.myTheme.FormGroup.height - props.myTheme.FormGroup.borderWidth*2 : props.myTheme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded,
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
        flex: props.inlineLabel ? .5 : 1,
        height: props.inlineLabel ? props.myTheme.FormGroup.height - props.myTheme.FormGroup.borderWidth*2 : props.myTheme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded
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
    //  valueKey,
      theme,
      //,
    //  multiSelect,
      ...rest
    } = this.props
    const { showSelector, value } = this.state


    let label = <SelectPlaceholder>{ placeholder }</SelectPlaceholder>
    if (value) {
      label=<View style={[styles.valueField,{backgroundColor:value}]}></View>;
    }
     return (
       <SelectWrapper inlineLabel={inlineLabel} myTheme={theme}>
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
                <Text style={{color: 'white'}}>Please select hue, saturation, brightness</Text>
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
             <BaseIcon name="arrow-dropdown" size={20}/>
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
//  options: PropTypes.array.isRequired,
  //valueKey: PropTypes.string,
  //value: PropTypes.oneOf([
  //  PropTypes.string,
  //  PropTypes.number,
  //  PropTypes.array
  //]),
  //value:PropTypes.array,
  //customModalPicker:PropTypes.node,
 // multiSelect:PropTypes.bool
}

Select.defaultProps = {
  componentName: 'Select',
  onValueChange: () => {},
  placeholder: '',
  labelKey: 'label',
 // valueKey: 'value',
  //value: '',
//  multiSelect: false
}


var styles = StyleSheet.create({
    button: {
        paddingTop:10,
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:10,
    },
    bar:{
      flexDirection:'row',justifyContent:'space-around',alignItems:'center' ,
      marginTop: isIphoneX?20+24: 20,
    },
    valueField:{borderRadius:11,width:22,height:22},
    colorPickerDlg:{flex: 1, paddingBottom: 15, backgroundColor: '#212021'},
    });

export default Select
