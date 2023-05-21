function updatePreview() {
  var opacityValue = document.getElementById('code-input').value;
  var preview = document.getElementById('result-preview');
  var img = preview.querySelector('img');
  img.style.opacity = opacityValue;
}