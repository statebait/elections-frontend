export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const isAlpha = function(ch) {
  return /^[A-Z]$/i.test(ch);
};

export function floorMapper(floor) {
  let level = "";
  if (floor) {
    if (floor[2] === "1") {
      level = "Ground";
    } else if (floor[2] === "2") {
      level = "First";
    } else if (floor[2] === "3") {
      level = "Top";
    }
    return `${floor[0].toUpperCase()}-${level}`;
  }
}
