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
