$(document.body).ready(function () {

  // load the trivia from the server
  $.ajax({
    url: 'owners.csv'
  }).done(function(owner) {

    // normalize the line breaks, then split into lines
    var lines = owner.replace(/\r\n|\r/g, '\n').trim().split('\n');
    var randomNumber;
    var lastRandomNumber;
    // only set up the click handler if there were lines found
    if (lines && lines.length) {
      $('#OwnerGen').on('click', function () {
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
        var name = parts[0];
        var desc= parts[1];
        $('#owner_name').text(name);
        $('#owner_desc').text(desc);

        var img = document.getElementById("ownerImage");
        $.ajax({
        url: ("lists/ownersList.csv")
        }).done(function(image_owner_file) {
        // normalize the line breaks, then split into lines
            var lines = image_owner_file.replace(/\r\n|\r/g, '\n').trim().split('\n');
            i = Math.floor(Math.random()*lines.length);
            img.src = lines[i];//(imgspath+files[i]);
        });
      });
    }
  });
});