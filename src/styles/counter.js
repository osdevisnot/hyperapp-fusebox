import { h } from 'hyperapp'
import * as picostyle from 'picostyle'
const styled = picostyle(h)

export const Counter = styled('div')({ textAlign: 'center' })
export const Heading = styled('h1')({ color: '#111' })
export const PaddedHeading = styled(Heading)({ padding: '1rem 0' })
export const Break = styled('hr')({ width: '100%', margin: '30px 0' })

// styled component using prop variation in userland
export const StyledButton = (props, children) =>
  styled('button')({
    borderColor: 'black',
    borderRadius: '3px',
    borderStyle: 'solid',
    borderWidth: '1px',
    width: '30px',
    height: '30px',
    outlineColor: 'darkturquoise',
    cursor: 'pointer',
    fontSize: '20px',
    color: props.disabled ? 'not-allowed' : 'black',
    backgroundColor: props.disabled
      ? // ? lighten('mediumvioletred', '50%') // todo: support scss equivalents?
        'yellow'
      : props.kind === 'add' ? 'mediumseagreen' : 'mediumvioletred'
  })(props, children)
