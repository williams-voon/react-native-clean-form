import React, { Component } from 'react'
import { View } from 'react-native'
import { FormGroup, Label } from '../../index'
import styled from 'styled-components/native'
import defaultTheme from '../Theme'
import ReactPropTypes from 'prop-types';

const ErrorMessage = styled.Text`
  color: ${props => props.myTheme.ErrorMessage.color};
  fontSize: ${props => props.myTheme.ErrorMessage.fontSize};
  marginBottom: ${props => props.myTheme.ErrorMessage.marginBottom};
  textAlign: ${props => props.myTheme.ErrorMessage.textAlign};
`

const TipsMessage = styled.Text`
  color: ${props => props.myTheme.TipsMessage.color};
  fontSize: ${props => props.myTheme.TipsMessage.fontSize};
  marginTop: ${props => props.myTheme.TipsMessage.marginTop};
  marginBottom: ${props => props.myTheme.ErrorMessage.marginBottom};
  textAlign: ${props => props.myTheme.TipsMessage.textAlign};
`
/*
class ErrorMessage extends Component {
  render(){
    let props=this.props;
    return (
      <Text style={{
        color:   props.myTheme.ErrorMessage.color,
        fontSize:   props.myTheme.ErrorMessage.fontSize,
        marginBottom:   props.myTheme.ErrorMessage.marginBottom,
        textAlign:   props.myTheme.ErrorMessage.textAlign
      }}  {...this.props}>{ this.props.children }</Text>
    )
  }
}
class TipsMessage extends Component {
  render(){
    let props=this.props;
    return (
      <Text style={{
        color: props.myTheme.TipsMessage.color,
        fontSize: props.myTheme.TipsMessage.fontSize,
        marginTop: props.myTheme.TipsMessage.marginTop,
        marginBottom: props.myTheme.ErrorMessage.marginBottom,
        textAlign: props.myTheme.TipsMessage.textAlign,
      }}  {...this.props}>{ this.props.children }</Text>
    )
  }
}
  */
ErrorMessage.defaultProps = {
  myTheme: defaultTheme
}
TipsMessage.defaultProps = {
  myTheme: defaultTheme
}

const render = renderComponent => props => {
  const { border, input : { onChange, ...restInput }, label,theme, spaceBetweenFlag, inlineLabel, showTips, tips, meta: { touched, error } } = props
  return (
    <View>
      { showTips && tips && <TipsMessage myTheme={theme?theme:defaultTheme}>{ tips }</TipsMessage> }
      <FormGroup border={border==undefined?FormGroup.defaultProps.border:border}
       inlineLabel={inlineLabel==undefined?FormGroup.defaultProps.inlineLabel:inlineLabel} theme={theme} error={touched && !!error} {...props} >
        {
          spaceBetweenFlag?
          (
             <View style={{flex:1}}>
              <Label theme={theme}>{ label }</Label>
            </View>
          ):(
            <Label theme={theme}>{ label }</Label>
          )
        }
        { renderComponent(props) }
      </FormGroup>
      { touched && error && <ErrorMessage myTheme={theme}>{ error }</ErrorMessage> }
    </View>
  )
}


const createInputCreator = ReduxFormFieldComponent => (name, renderFunction, PropTypes = {}, defaultProps = {}) => {
  const Component = render(renderFunction)
  Component.displayName = name

  const FieldWrapper = props => {
    const { component, name, ...rest } = props

    return <ReduxFormFieldComponent name={name} component={Component} {...rest} />
  }

  FieldWrapper.displayName = 'FieldWrapper'
  FieldWrapper.propTypes = Object.assign({
    isPwd: ReactPropTypes.bool,
    border: ReactPropTypes.bool,
    inlineLabel: ReactPropTypes.bool,
    label: ReactPropTypes.string.isRequired,
    name: ReactPropTypes.string.isRequired,
  }, PropTypes)

  FieldWrapper.defaultProps = Object.assign({
    border: FormGroup.defaultProps.border,
    inlineLabel: FormGroup.defaultProps.inlineLabel
  }, defaultProps)

  return FieldWrapper
}

export default createInputCreator
