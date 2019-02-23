export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export var isAlpha = function(ch) {
  return /^[A-Z]$/i.test(ch);
};
