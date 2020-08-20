const ThemeColors = () => {
  let r = 0
  let g
  let b
  // let r = 25 % 256
  // let g = 35 % 256
  // let b = 55 % 256
  const result = [
    "#7367F0",
    "#28C76F",
    "#EA5455",
    "#FF9F43",
    "#629749",
    "#00cfe8",
    "#1a237e",
    "#EA6737",
    "#33691e",
    "#003d00",
    "#000000",
    "#0a00b6",
  ]

  for (let i = 0; i < 40; i++) {
    r += 10
    g = Math.floor(Math.random() * 100) + 1
    b = Math.floor(Math.random() * 100) + 1
    result.push(`rgb(${parseInt(r, 10)},${parseInt(g, 10)},${parseInt(b, 10)})`)
  }
  return result
}

export default ThemeColors
