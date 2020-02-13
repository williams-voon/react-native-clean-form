import React, { Component } from 'react';
import { View} from 'react-native'
//import styled from 'styled-components/native'

// const FieldsContainer = styled.View`
//   flex:1;
// `
class FieldsContainer extends Component {
  render(){
    return (
      <View style={{flex:1}} {...this.props}>{ this.props.children }</View>
    )
  }
}

export default FieldsContainer
