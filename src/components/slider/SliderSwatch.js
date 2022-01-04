import React from 'react'
import reactCSS from 'reactcss'
import tinycolor from 'tinycolor2'
import { GetColorName } from 'hex-color-to-color-name';

export const SliderSwatch = ({ hsl, offset, onClick = () => {}, active, first, last }) => {
  const styles = reactCSS({
    'default': {
      swatch: {
        height: '12px',
        // Saturation hardcoded here and in SliderSwatches (as to make the swatch active).
        background: `hsl(${ hsl.h }, 80%, ${ (offset * 100) }%)`,
        cursor: 'pointer',
      },
    },
    'first': {
      swatch: {
        borderRadius: '2px 0 0 2px',
      },
    },
    'last': {
      swatch: {
        borderRadius: '0 2px 2px 0',
      },
    },
    'active': {
      swatch: {
        transform: 'scaleY(1.8)',
        borderRadius: '3.6px/2px',
      },
    },
  }, { active, first, last })

  const handleClick = e => onClick({
    h: hsl.h,
    s: 0.8,
    l: offset,
    source: 'hsl',
  }, e)

  const handleKeyDown = e => e.key === 'Enter' && handleClick(e)

  const getColorName = () => {
    const hexColor = tinycolor(hsl).toHex()
    const colorName = GetColorName(hexColor)
    const lightness = Math.round(offset * 100).toString().concat('% Lightness')
    const colorDetails = `Hue of ${ Math.round(hsl.h) } and saturation of 80%.`
    return colorName.concat(' ', lightness, ' ', colorDetails)
  }

  return (
    <div
      aria-label={ `Change color to ${ getColorName() }` }
      tabIndex={ 0 }
      style={ styles.swatch }
      onClick={ e => handleClick(e) }
      onKeyDown={ e => handleKeyDown(e) }
    />
  )
}

export default SliderSwatch
