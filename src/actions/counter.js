export const actions = {
  add: _ => ({ num, clicks }) => ({ num: num + 1, clicks: clicks + 1 }),
  sub: _ => ({ num, clicks }) => ({ num: num - 1, clicks: clicks + 1 })
}
