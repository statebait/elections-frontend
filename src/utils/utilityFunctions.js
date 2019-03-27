export function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

export const isAlpha = function(ch) {
  return /^[A-Z]$/i.test(ch);
};

export const useMap = !(
  process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
);

export function floorMapper(floor) {
  let level;
  if (floor[2] === "1") {
    level = "Ground";
  } else if (floor[2] === "2") {
    level = "First";
  } else if (floor[2] === "3") {
    level = "Top";
  }
  return `${floor[0].toUpperCase()}-${level}`;
}
