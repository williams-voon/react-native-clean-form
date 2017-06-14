import React, { Component } from 'react'
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
`

//height: ${props => props.inlineLabel ? props.theme.FormGroup.height - props.theme.FormGroup.borderWidth*2 : props.theme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded};

LabelIconWrapper.defaultProps = {
  theme: defaultTheme
}

const SelectWrapper = styled.View`
  flex: ${props => props.inlineLabel ? .5 : 1};
`

//height: ${props => props.inlineLabel ? props.theme.FormGroup.height - props.theme.FormGroup.borderWidth*2 : props.theme.FormGroup.height-HaveNoIdeaWhyThisIsNeeded};

SelectWrapper.defaultProps = {
  theme: defaultTheme
}

const Icon = styled(BaseIcon)`
  height:10;
  width:10;
`

const SelectPlaceholder = styled.Text`
  color: ${props => props.theme.BaseInput.placeholderColor};
  margin-bottom: 5;
  fontSize: ${props => props.theme.BaseInput.fontSize};
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

  render() {
    const {
      inlineLabel,
      labelKey,
      options,
      onValueChange,
      placeholder,
      valueKey,
      theme,
      customModalPicker,
      multiSelect,
      addItemFunc,
      ...rest
    } = this.props
    const { showSelector, value } = this.state

    const labelsByValue = options.reduce((carry, option) => {
      carry[option.value] = option
      return carry
    }, {})

    let label = <SelectPlaceholder>{ placeholder }</SelectPlaceholder>
    if (value) {
      if(multiSelect){
        /*
        label=value.split(",").reduce((carry, option) => {
          if(labelsByValue[option]){
            if(carry.length>0){
              carry=carry+','+labelsByValue[option]
            }else{
              carry=labelsByValue[option]
            }
          }
          return carry
        }, '')
        */
        let items=value.split(",").reduce((carry, option) => {
          if(labelsByValue[option]){
            carry.push(labelsByValue[option])
            return carry
          }
        }, [])
        label = items.map((item,i)=>{
          let fontColor='black'
          let backgroundColor='white'
          let borderColor:'lightgrey'
          if(item.rgbColor){
            backgroundColor=item.rgbColor
            borderColor='white'
            let sColorChange = [];
            for(let i=1; i<7; i+=2){
                 sColorChange.push(parseInt("0x"+item.rgbColor.slice(i,i+2)));
            }
            if(sColorChange[0]+sColorChange[1]+sColorChange[2]<128*3-1){
              fontColor='white'
            }
          }
          return (
            <View key={i} style={{padding:4,borderWidth:1,marginRight:5,marginTop:1,
               marginBottom:4 ,borderRadius: 5, borderColor:borderColor, backgroundColor: backgroundColor}}>
              <Text style={{color:fontColor,backgroundColor:'transparent'
               }}>{item.label}
              </Text>
            </View>
          );
        })
      }else{
        label = labelsByValue[value].label
      }
    }
    if (customModalPicker){
      let CustomModalPicker=customModalPicker;
     return (
       <SelectWrapper inlineLabel={inlineLabel} theme={theme}>

         <CustomModalPicker
           onRequestClose={this.toggleSelector}
           visible={showSelector}
           data={options}
           onChange={this.onValueChange}
           cancelText="取消"
           initValue={value}
           addItemFunc={addItemFunc!=undefined?()=>{addItemFunc(this.toggleSelector)}: null }
         />

         <TouchableOpacity onPress={this.toggleSelector}>
           <LabelIconWrapper inlineLabel={inlineLabel}>
             {
               multiSelect?(
                 <View style={{flexDirection:'row', flexWrap: 'wrap', flex:1}}>
                   {label}
                 </View>
               ):(<SelectLabel inlineLabel={inlineLabel}>{ label }</SelectLabel>)
             }
             <Icon name="ios-arrow-down" />
           </LabelIconWrapper>
         </TouchableOpacity>
       </SelectWrapper>
      )
    }
     else if( Platform.OS === 'ios' ) {
      return (
        <SelectWrapper inlineLabel={inlineLabel} theme={theme}>
          <Modal
            onRequestClose={this.toggleSelector}
            visible={showSelector}
          >
            <Picker
              selectedValue={value}
              onValueChange={this.onValueChange}
              {...rest}>
              { options.map(option => {
                const label = option[labelKey]
                const value = option[valueKey]

                return <Picker.Item key={value} label={label} value={value} />
              }) }
            </Picker>
          </Modal>

          <TouchableOpacity onPress={this.toggleSelector}>
            <LabelIconWrapper inlineLabel={inlineLabel}>
              <SelectLabel inlineLabel={inlineLabel}>{ label }</SelectLabel>
              <Icon name="ios-arrow-down" />
            </LabelIconWrapper>
          </TouchableOpacity>
        </SelectWrapper>
      )
    }else{
      let height=theme?theme.FormGroup.height:defaultTheme.FormGroup.height;
      return (
        <SelectWrapper inlineLabel={inlineLabel} theme={theme}>
          <Picker
            style={{height:height}}
            selectedValue={value}
            onValueChange={this.onValueChange}
            {...rest}>
            { options.map(option => {
              const label = option[labelKey]
              const value = option[valueKey]

              return <Picker.Item key={value} label={label} value={value} />
            }) }
          </Picker>
        </SelectWrapper>
      )
    }
  }
}

Select.PropTypes = {
  labelKey: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  onValueChange: React.PropTypes.func.isRequired,
  options: React.PropTypes.array.isRequired,
  valueKey: React.PropTypes.string,
  value: React.PropTypes.oneOf([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.array
  ]),
  customModalPicker:React.PropTypes.node,
  multiSelect:React.PropTypes.bool
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

export default Select
