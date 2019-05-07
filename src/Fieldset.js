import React from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components/native'
import defaultTheme from './Theme'

import PropTypes from 'prop-types';

const FieldsetLabelText = styled.Text`
  color: ${props => props.myTheme.Fieldset.labelColor };
  fontSize: ${props => props.myTheme.Fieldset.labelSize };
  fontWeight: ${props => props.myTheme.Fieldset.labelWeight };
  height: ${props => props.myTheme.Fieldset.labelHeight };
`

FieldsetLabelText.defaultProps = {
  myTheme: defaultTheme
}

const FieldsetLabel = props => <View><FieldsetLabelText>{ props.children }</FieldsetLabelText></View>

const FieldsetWrapper = styled.View`
  borderBottomColor: ${props => props.myTheme.Fieldset.borderBottomColor };
  borderBottomWidth: ${props => props.last ? 0 : props.myTheme.Fieldset.borderBottomWidth };
  paddingTop : ${props => props.myTheme.Fieldset.paddingTop };
  paddingRight : ${props => props.myTheme.Fieldset.paddingRight };
  paddingBottom : ${props => props.myTheme.Fieldset.paddingBottom };
  paddingLeft : ${props => props.myTheme.Fieldset.paddingLeft };
`

FieldsetWrapper.defaultProps = {
  theme: defaultTheme
}

const FieldsetFormWrapper = styled.View`

`

const Fieldset = props => {
  const { children, label, last, theme } = props

  return (
    <FieldsetWrapper last={last} myTheme={theme}>
      { /* text-transform is for some reason not supported in react native https://github.com/facebook/react-native/issues/2088 */ }
      { label && <FieldsetLabel>{ label.toUpperCase() }</FieldsetLabel> }
      <FieldsetFormWrapper>
        { children }
      </FieldsetFormWrapper>
    </FieldsetWrapper>
  )
}

Fieldset.propTypes = {
  last: PropTypes.bool,
  label: PropTypes.string,
  componentName: PropTypes.string,
}

Fieldset.defaultProps = {
  componentName: 'Fieldset',
  last: false,
  label: undefined,
  theme: defaultTheme
}

export default Fieldset
