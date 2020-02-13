import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components/native'
import _ from 'lodash'
import defaultTheme from './Theme'

import PropTypes from 'prop-types';

/**
 * Calculate the height based on the given field properties.
 * The inline label and multiline properties affect the height.
 *
 * @param {Object} props
 * @returns {int}
 */
const calculateHeight = (props) => {
  let height = props.theme.FormGroup.height

  if (props.multiline) {
    height = props.theme.FormGroup.height * props.numberOfLines
  }

  if (!props.inlineLabel) {
    height += props.theme.Label.stackedHeight
  }

  return (height)
}

const FormGroupWrapper = styled.View`
  align-items: ${props => props.inlineLabel ? 'center' : 'stretch' };
  border-color: ${props => props.error ? props.myTheme.FormGroup.errorBorderColor : props.myTheme.FormGroup.borderColor};
  border-radius: ${props => props.myTheme.FormGroup.borderRadius};
  border-style: ${props => props.myTheme.FormGroup.borderStyle};
  border-width: ${props => props.border ? props.myTheme.FormGroup.borderWidth : 0};
  flex-direction: ${props => props.inlineLabel ? 'row' : 'column' };
  justify-content: flex-start;
  margin-bottom: ${props => props.myTheme.FormGroup.marginBottom};
  padding-top : ${props => props.myTheme.Fieldset.paddingTop };
  padding-right : ${props => props.myTheme.Fieldset.paddingRight };
  padding-bottom : ${props => props.myTheme.Fieldset.paddingBottom };
  padding-left : ${props => props.myTheme.Fieldset.paddingLeft };
`

//height: ${props => calculateHeight(props)};

FormGroupWrapper.defaultProps = {
  myTheme: defaultTheme,
  componentName: 'FormGroupWrapper'
}

const FormGroup = props => {
  const { border, error, inlineLabel, theme, multiline, numberOfLines, keyboardType, returnKeyType } = props
  const children = React.Children.map(props.children, child => {
    let subsetOfProps = {}
    if (child.props.componentName === 'Input') {
      const inputPropTypes = Object.keys(child.type.propTypes)
      subsetOfProps = _.pick(props, inputPropTypes);
    }

    return React.cloneElement(child, Object.assign({}, child.props, {
      inlineLabel, theme, ...subsetOfProps
    }))
  })

  return (
    <FormGroupWrapper border={border} error={error} inlineLabel={inlineLabel}
      multiline={multiline} numberOfLines={numberOfLines} myTheme={theme}>
      { children }
    </FormGroupWrapper>
  )
}

FormGroup.propTypes = {
  border: PropTypes.bool,
  error: PropTypes.bool,
}

FormGroup.defaultProps = {
  componentName: 'FormGroup',
  border: true,
  error: false,
  inlineLabel: true,
  numberOfLines: 1,
  multiline: false
}

export default FormGroup
