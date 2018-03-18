import { h } from 'hyperapp'
import * as picostyle from 'picostyle'
const styled = picostyle(h)

import { Counter, Heading, PaddedHeading, Break, StyledButton } from '../styles/counter'

const clickCount = clicks => {
  return clicks > 0 ? (
    <div>
      You clicked {clicks} time{clicks > 1 ? 's' : ''}
    </div>
  ) : (
    ''
  )
}

const Button = ({ kind, label, update, disabled }) => (
  <StyledButton kind={kind} onclick={update} disabled={disabled ? disabled : false}>
    {label}
  </StyledButton>
)

export const view = (state, actions) => (
  <Counter>
    <Heading>Welcome to HyperApp!</Heading>
    <Break />
    <section>
      {Button({ kind: 'add', label: '+', update: actions.add })}
      <PaddedHeading>{state.num}</PaddedHeading>
      {Button({ kind: 'sub', label: '-', update: actions.sub, disabled: state.num <= 0 })}
      {clickCount(state.clicks)}
    </section>
  </Counter>
)
