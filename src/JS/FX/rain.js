import RainyDay from 'rainyday.js/src/rainyday'
export default function rain (elementName) {
  var image = document.getElementById(elementName)
  var container = document.getElementById(elementName + '_container')
  var engine = new RainyDay({
    image: image,
    parentElement: container
  })
  engine.rain([
    [1, 2, 8000]
  ])
  engine.rain([
    [3, 3, 0.88],
    [5, 5, 0.9],
    [6, 2, 1]
  ], 100)
}
