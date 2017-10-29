import React from 'react'
import { View } from 'react-native'
import { FormGroup, Label } from '../../index'
import styled from 'styled-components/native'
import defaultTheme from '../Theme'
import ReactPropTypes from 'prop-types';

const ErrorMessage = styled.Text`
  color: ${props => props.theme.ErrorMessage.color};
  fontSize: ${props => props.theme.ErrorMessage.fontSize};
  marginBottom: ${props => props.theme.ErrorMessage.marginBottom};
  textAlign: ${props => props.theme.ErrorMessage.textAlign};
`
const TipsMessage = styled.Text`
  color: ${props => props.theme.TipsMessage.color};
  fontSize: ${props => props.theme.TipsMessage.fontSize};
  marginTop: ${props => props.theme.TipsMessage.marginTop};
  marginBottom: ${props => props.theme.ErrorMessage.marginBottom};
  textAlign: ${props => props.theme.TipsMessage.textAlign};
`

ErrorMessage.defaultProps = {
  theme: defaultTheme
}

const render = renderComponent => props => {
  const { border, input : { onChange, ...restInput }, label, spaceBetweenFlag, inlineLabel, showTips, tips, theme, meta: { touched, error } } = props

  return (
    <View>
      { showTips && tips && <TipsMessage theme={theme?theme:defaultTheme}>{ tips }</TipsMessage> }
      <FormGroup border={border} inlineLabel={inlineLabel} theme={theme} error={touched && !!error} {...props} >
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
      { touched && error && <ErrorMessage theme={theme}>{ error }</ErrorMessage> }
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
  FieldWrapper.PropTypes = Object.assign({
    border: ReactPropTypes.bool,
    inlineLabel: ReactPropTypes.bool,
    label: ReactPropTypes.string.isRequired,
    name: ReactPropTypes.string.isRequired
  }, PropTypes)
  FieldWrapper.defaultProps = Object.assign({
    border: FormGroup.defaultProps.border,
    inlineLabel: FormGroup.defaultProps.inlineLabel
  }, defaultProps)

  return FieldWrapper
}

export default createInputCreator
