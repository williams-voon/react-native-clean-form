'use strict';

import React,{
    PropTypes,Component
} from 'react';

import {
    View,
    StyleSheet,
    Dimensions,
    Modal,
    Text,
    ScrollView,
    TouchableOpacity,
    Platform
} from 'react-native';

import styles from './FcSelectStyle';


const propTypes = {
    data: PropTypes.array,
    onChange: PropTypes.func,
    initValue: PropTypes.string,
    style: View.propTypes.style,
    selectStyle: View.propTypes.style,
    optionStyle: View.propTypes.style,
    optionTextStyle: Text.propTypes.style,
    sectionStyle: View.propTypes.style,
    sectionTextStyle: Text.propTypes.style,
    cancelStyle: View.propTypes.style,
    cancelTextStyle: Text.propTypes.style,
    overlayStyle: View.propTypes.style,
    cancelText: PropTypes.string
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
    cancelText: 'cancel'
};

export default class FcModalPicker extends Component {

    constructor() {
        super();
        this.onChange=this.onChange.bind(this);
        this.state = {
            animationType: 'slide',
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

        return (
            <View style={[styles.overlayStyle, this.props.overlayStyle]}>
                <View style={styles.optionContainer}>
                    <ScrollView keyboardShouldPersistTaps={'always'}>
                        <View style={{paddingHorizontal:10}}>
                            {options}
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.cancelContainer}>
                    <TouchableOpacity onPress={this.props.onRequestClose}>
                        <View style={[styles.cancelStyle, this.props.cancelStyle]}>
                            <Text style={[styles.cancelTextStyle,this.props.cancelTextStyle]}>{this.props.cancelText}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>);
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
