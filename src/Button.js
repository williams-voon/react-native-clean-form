import React from 'react'
import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View
} from 'react-native'
import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/Ionicons'
import defaultTheme from './Theme'
import PropTypes from 'prop-types';

const ButtonWrapper = styled.View`
  flex:1;
  align-self: stretch;
  flex-direction: column;
  justify-content: center;
`

const ButtonStyle = styled.View`
  backgroundColor: ${props => props.myTheme.Button.backgroundColor};
  height: ${props => props.myTheme.Button.height};
`

ButtonStyle.defaultProps = {
  myTheme: defaultTheme
}

const ButtonTextWrapper = styled.View`
  flex:1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonText = styled.Text`
  color: ${props => props.myTheme.Button.color};
  font-size: ${props => props.myTheme.Button.fontSize};
  font-weight: ${props => props.myTheme.Button.fontWeight};
`

ButtonText.defaultProps = {
  myTheme: defaultTheme,
  componentName: 'Button'
}

const Button = props => {
  const { children : label, icon, iconPlacement, submitting, theme, ...rest } = props

  const Touchable = Platform.OS === 'android'
    ? TouchableNativeFeedback
    : TouchableOpacity

  const formattedLabel = Platform.OS === 'android'
    ? label.toUpperCase()
    : label

  const children = [
    formattedLabel
  ]

  let IconWrapped = null
  if (icon || submitting) {
    const IconComponent = submitting
      ? <ActivityIndicator size="small" key="icon" color={theme.Button.color} />
      : <Icon key="icon" name={icon} size={14} color={theme.Button.color} />

    const prop = iconPlacement === 'left'
      ? 'marginRight'
      : 'marginLeft'

    IconWrapped = React.createElement(View, {
      children: IconComponent,
      style: {
        [prop]: 5
      }
    })
  }

  return (
    <ButtonWrapper>
      <Touchable {...rest}>
        <ButtonStyle myTheme={theme}>
          <ButtonTextWrapper>
            {iconPlacement === 'left' && IconWrapped}
            <ButtonText myTheme={theme}>
              { children }
            </ButtonText>
            {iconPlacement === 'right' && IconWrapped}
          </ButtonTextWrapper>
        </ButtonStyle>
      </Touchable>
    </ButtonWrapper>
  )
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
  icon: PropTypes.string,
  iconPlacement: PropTypes.oneOf(['left', 'right']),
  submitting: PropTypes.bool
}

Button.defaultProps = {
  icon: false,
  iconPlacement: 'left',
  submitting: false,
  theme: defaultTheme
}

export default Button
