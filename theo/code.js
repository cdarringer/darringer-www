


document.getElementById('copyButton').addEventListener('click', function() {
  var link = 'darringer.com/theo';

  var tempInput = document.createElement('input');
  tempInput.value = link;
  document.body.appendChild(tempInput);

  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  
});
