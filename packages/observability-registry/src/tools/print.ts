import reg from '../index.ts'
const print = () => {
  reg
    .list()
    .map((item) => item.build())
    .map((item) => JSON.stringify(item, null, 2))
    .forEach((item) => {
      console.log(item)
    })
}
print()
