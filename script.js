var lines;
var randomNumber;
var lastRandomNumber;

$(document.body).ready(function () {

  // load the trivia from the server
  $.ajax({
    url: 'patrons_full.csv'
  }).done(function(content) {

    // normalize the line breaks, then split into lines
    lines = content.replace(/\r\n|\r/g, '\n').trim().split('\n');

    // only set up the click handler if there were lines found
    if (lines && lines.length) {
      $('#showInnPatron').on('click', function () {
        // loop to prevent repeating the last random number
        while (randomNumber === lastRandomNumber) {
          randomNumber = parseInt(Math.random() * lines.length);
          // check to prevent infinite loop
          if (lines.length === 1) { break; }
        }
        // keep track of the last random number
        lastRandomNumber = randomNumber;

        // show the corresponding line
        var line = lines[randomNumber];
        var parts = line.split(",");
        var race = parts[1];
        var PNs= parts[2];
        $('#patron').text(parts[0]);
        $('#race').text(race);
        $('#gender').text(PNs);
        $('#quirk').text(parts[3]);
        var img = document.getElementById("npc_image");
        $.ajax({
        url: ("lists/" + race+PNs+"List.csv")
        }).done(function(image_text_file) {
        // normalize the line breaks, then split into lines
            var lines = image_text_file.replace(/\r\n|\r/g, '\n').trim().split('\n');
            i = Math.floor(Math.random()*lines.length);
            img.src = lines[i];//(imgspath+files[i]);
            //$('#quirk').text(lines[i])
        });
        //$('#quirk').text(lines[0]);
        //img.src = "Elf/He/dusk elf.png";
      });
    }
  });
});