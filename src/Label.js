import React from 'react'
import { Text, View, Platform } from 'react-native'
import styled from 'styled-components/native'
import defaultTheme,{BoldTheme} from './Theme'

const LabelWrapper = styled.View`
  flex: ${props => props.inlineLabel ? 0.5 : 1};
  flex-direction: ${props => props.inlineLabel ? 'row' : 'column'};
  flex-direction: column;
  justify-content: center;
  padding-left: ${Platform.OS === 'android' ? 5 : 0};
  marginTop: ${props => props.inlineLabel ? 0 : 5};
`

const LabelText = styled.Text`
  color: ${props => props.theme.Label.color};
  margin-top: 5;
  margin-bottom: 5;
  font-size: ${props => props.theme.Label.fontSize};
  fontWeight: ${props => props.theme.Label.fontWeight};
`

LabelText.defaultProps = {
  theme: defaultTheme,
  componentName: 'Label',
}

const Label = props => {
  const { children, inlineLabel, theme } = props
  let textTheme = theme
  let children2=children
  if (typeof children == 'string'){
    if(children.slice(-1) == '*'){
      children2=children.slice(0,-1)
      textTheme=BoldTheme
    }
  }
  return (
    <LabelWrapper inlineLabel={inlineLabel} theme={theme}>
      <LabelText inlineLabel={inlineLabel} theme={textTheme} >{ children2 }</LabelText>
    </LabelWrapper>
  )
}

Label.PropTypes = {
  children: React.PropTypes.string.isRequired
}

export default Label
