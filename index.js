const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));

const { parse, draw, convertToMidi} = require('mmx-calibration-lib')

console.log("Wintergatan Programming templates converter");
console.log("===========================================");
if (argv._.length !== 1 || (!argv.svg && !argv.dxf && !argv.midi)) {
  console.log("Usage: node index.js input.csv --svg output.svg --dxf output.dxf --midi output.midi");
  console.log("You can either supply svg, dxf, midi or all three.");
} else {
  parse(argv._[0], musicData => {
    if (argv.svg || argv.dxf) {
      const drawing = draw(musicData);
      if(argv.svg){
        fs.writeFileSync(argv.svg, drawing.svg)
        console.log("SVG written to '" + argv.svg + "'");
      }
      if(argv.dxf){
        fs.writeFileSync(argv.dxf, drawing.dxf)
        console.log("DXF written to '" + argv.dxf + "'");
      }
    }
    if (argv.midi) {
      const midi = convertToMidi(musicData);
      fs.writeFileSync("./output/midi.midi", midi)
      console.log("MIDI written to '" + argv.midi + "'");
    }
  })
}