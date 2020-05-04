
import PropTypes from 'prop-types';
import React,{
    Component
} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    ScrollView,
    Platform,
    Switch,
    TouchableOpacity,
    ViewPropTypes,
    SafeAreaView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import styles,{OPTION_CONTAINER_HEIGHT, TOP} from './FcSelectStyle';

const propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.string,
    style: ViewPropTypes.style,
    selectStyle: ViewPropTypes.style,
    optionStyle: ViewPropTypes.style,
    optionTextStyle: Text.propTypes.style,
    sectionStyle: ViewPropTypes.style,
    sectionTextStyle: Text.propTypes.style,
    cancelStyle: ViewPropTypes.style,
    cancelTextStyle: Text.propTypes.style,
    overlayStyle: ViewPropTypes.style,
    cancelText: PropTypes.string,
    comfirmText: PropTypes.string
};

const defaultProps = {
    data: [],
    onChange: (item,checked)=> {},
    initValue: '',
    style: {},
    selectStyle: {},
    optionStyle: {},
    optionTextStyle: {},
    sectionStyle: {},
    sectionTextStyle: {},
    cancelStyle: {},
    cancelTextStyle: {},
    overlayStyle: {},
    cancelText: 'cancel',
    comfirmText: 'OK'
};

export default class FcModalMultiPicker extends Component {

    constructor() {
        super();
        this.state = {
            animationType: 'none',// 'slide',
            transparent: false,
            selected: [],
        };
    }
    filterInitialValue(strs){
      let options = this.props.data.reduce((carry,current)=>{
        carry.push(current.value)
        return carry;
      },[])
      return strs.reduce((carry,current)=>{
        if(options.includes(current)){
          carry.push(current)
        }
        return carry;
      },[])
    }
    componentDidMount() {
      if(this.props.initValue){
        let strs=this.props.initValue.split(",")
        strs=this.filterInitialValue(strs)
        this.setState({selected: strs});
      }
      this.setState({cancelText: this.props.cancelText});
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.initValue != this.props.initValue) {
        if(nextProps.initValue){
          let strs=nextProps.initValue.split(",")
          strs=this.filterInitialValue(strs)
          this.setState({selected: strs});
        }
      }
    }

    toggleValue(item){
      if(this.state.selected.includes(item.value)){
        let newVal=this.state.selected.reduce((carry,current)=>{
          if(item.value==current){
            return carry;
          }
          return [...carry, current ]
        },[]);
        this.setState({selected:newVal});
      }else{
          this.setState({selected: [...this.state.selected,item.value]});
      }
    }
    confirm(){
      let newVal=''
      if(this.state.selected){
        newVal=this.state.selected.reduce((carry, option) => {
          if(carry.length>0){
            carry=carry+','+option
          }else{
            carry=option
          }
          return carry
        }, '')
      }
      this.props.onChange(newVal);
      this.props.onRequestClose();
    }
    cancel(){
      if(this.props.initValue){
        let strs=this.props.initValue.split(",")
        strs=this.filterInitialValue(strs)
        this.setState({selected: strs});
      }
      this.props.onRequestClose();
    }

    renderSection(section) {
        return (
            <View key={section.key} style={[styles.sectionStyle,this.props.sectionStyle]}>
                <Text style={[styles.sectionTextStyle,this.props.sectionTextStyle]}>{section.label}</Text>
            </View>
        );
    }

    renderOption(option) {
      let selected={}
      let checked=false;
      if(this.state.selected.includes(option.value)){
        selected=styles.selectedOptionTextStyle
        checked=true
      }
      return (
          <View key={option.value}>
            <TouchableOpacity  style={[styles.optionWrapperStyle, this.props.optionWrapperStyle]} onPress={()=>{this.toggleValue(option);}}>
              <View style={{width:30}}>
                { checked && <Icon name={ 'md-checkmark' } size={18} color={'black'} />  }
              </View>
              <Text style={[styles.optionTextStyle,this.props.optionTextStyle,selected,{flex:1}]}>{option.label}</Text>
              { option.rgbColor && <View style={{borderRadius:11,width:22,height:22,backgroundColor:option.rgbColor}}></View> }
            </TouchableOpacity>
          </View>
        )
    }

    renderOptionList() {
        var options = this.props.data.map((item) => {
            if (item.section) {
                return this.renderSection(item);
            } else {
                return this.renderOption(item);
            }
        });
        let height=OPTION_CONTAINER_HEIGHT
        let marginTop=TOP
        let showsVerticalScrollIndicator=true
        if(height>(this.props.data.length)*39){
          height = (this.props.data.length)*39
          marginTop += (OPTION_CONTAINER_HEIGHT-height)
          showsVerticalScrollIndicator=false
        }
        return (
            <SafeAreaView style={{flex:1, backgroundColor: 'rgba(0,0,0,0.7)'}} >
              {
                this.props.addItemFunc!=undefined&&
                  <TouchableOpacity style={styles.addItemButtonWrap} onPress={()=>{
                    this.props.onRequestClose()
                    this.props.addItemFunc()}}>
                    <View style={styles.addItemButton}>
                      <Icon name={ 'md-add' } size={26} style={{height:26}} color={'white'} />
                    </View>
                  </TouchableOpacity>
              }
              <View style={[styles.optionContainer,{height:height,marginTop:marginTop}]}>
                  <ScrollView showsVerticalScrollIndicator={showsVerticalScrollIndicator}>
                      <View >
                        {options}
                      </View>
                  </ScrollView>

              </View>
               <View style={styles.cancelComfirmContainer}>
                  <TouchableOpacity style={styles.cancelConfirmButtonStyle} onPress={this.cancel.bind(this)}>
                      <View style={[styles.cancelButtonStyle, this.props.cancelButtonStyle]}>
                          <Text style={[styles.cancelTextStyle,this.props.cancelTextStyle]}>{this.props.cancelText}</Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelConfirmButtonStyle} onPress={this.confirm.bind(this)}>
                      <View style={[styles.confirmButtonStyle, this.props.confirmButtonStyle]}>
                          <Text style={[styles.confirmTextStyle,this.props.confirmTextStyle]}>{this.props.comfirmText}</Text>
                      </View>
                  </TouchableOpacity>
              </View>

           </SafeAreaView>
    );
    }

    render() {
        return (
          <Modal transparent={true} visible={this.props.visible}
            onRequestClose={this.props.onRequestClose} animationType={this.state.animationType}>
            {this.renderOptionList()}
          </Modal>
        );
    }
}

FcModalMultiPicker.propTypes = propTypes;
FcModalMultiPicker.defaultProps = defaultProps;
