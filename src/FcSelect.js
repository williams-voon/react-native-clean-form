
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
    TouchableOpacity,
    Platform,
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
    deselectText: PropTypes.string
};

const defaultProps = {
    data: [],
    onChange: ()=> {},
    initValue: 'Select me!',
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
    deselectText: '全部不选'
};

export default class FcModalPicker extends Component {

    constructor() {
        super();
        this.onChange=this.onChange.bind(this);
        this.state = {
            animationType:'none',// 'slide',
            transparent: false,
            selected: ''
        };
    }

    componentDidMount() {
        this.setState({selected: this.props.initValue});
        this.setState({cancelText: this.props.cancelText});
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.initValue != this.props.initValue) {
        this.setState({selected: nextProps.initValue});
      }
    }

    onChange(item) {
        this.props.onChange(item.value);
        this.setState({selected: item.value});
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
      if(this.state.selected===option.value){
        selected=styles.selectedOptionTextStyle
      }
      return (
          <TouchableOpacity key={option.value} onPress={()=>this.onChange(option)}>
              <View style={[styles.optionStyle, this.props.optionStyle]}>
                  <Text style={[styles.optionTextStyle,this.props.optionTextStyle,selected]}>{option.label}</Text>
              </View>
          </TouchableOpacity>)
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
            <SafeAreaView style={{flex:1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
              {
                this.props.addItemFunc!=undefined&&
                <TouchableOpacity style={styles.addItemButtonWrap}  onPress={()=>{
                    this.props.onRequestClose()
                    this.props.addItemFunc()}}>
                    <View style={styles.addItemButton} >
                        <Icon name={ 'md-add' } size={26} style={{height:26}} color={'white'} />
                    </View>
                </TouchableOpacity>
              }
              <View style={[styles.optionContainer,{height:height,marginTop:marginTop}]}>
                  <ScrollView showsVerticalScrollIndicator={showsVerticalScrollIndicator} keyboardShouldPersistTaps={'always'}>
                      <View style={{paddingHorizontal:10}}>
                          {options}
                      </View>
                  </ScrollView>
              </View>
               <View style={[styles.cancelComfirmContainer, {marginBottom: 20}]}>
                  <TouchableOpacity style={styles.cancelConfirmButtonStyle} onPress={this.props.onRequestClose}>
                      <View style={[styles.cancelButtonStyle, this.props.cancelButtonStyle]}>
                          <Text style={[styles.cancelTextStyle,this.props.cancelTextStyle]}>{this.props.cancelText}</Text>
                      </View>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelConfirmButtonStyle} onPress={()=>{
                      this.props.onChange(null);
                      this.props.onRequestClose();
                  }}>
                      <View style={[styles.confirmButtonStyle, this.props.confirmButtonStyle]}>
                          <Text style={[styles.confirmTextStyle,this.props.confirmTextStyle]}>{this.props.deselectText}</Text>
                      </View>
                  </TouchableOpacity>
              </View>

            </SafeAreaView>);
    }

    render() {
        return (
          <Modal transparent={true} visible={this.props.visible} onRequestClose={this.props.onRequestClose} animationType={this.state.animationType}>
            {this.renderOptionList()}
          </Modal>
        );
    }
}

FcModalPicker.propTypes = propTypes;
FcModalPicker.defaultProps = defaultProps;
