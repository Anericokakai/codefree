export const concat = (s, n) => {
  return s?.length > n ? s?.substring(0, n - 1) + "..." : s;
};
