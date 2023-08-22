const sum = (a: number, b: number): number => {
  console.log('call sum()');
  return a + b;
};

const getMemoizedFunction = (func: (a: number, b: number) => number) => {
  const cache: Record<string, number> = {};
  return (a: number, b: number): number => {
    const key = `a=${a},b=${b}`;
    if (!cache[key]) {
      cache[key] = func(a, b);
    }
    return cache[key];
  };
};

const memoizedSum = getMemoizedFunction(sum);

export const test = () => {
  console.log(memoizedSum(1, 2));
  console.log(memoizedSum(5, 3));
  console.log(memoizedSum(2, 7));
  console.log(memoizedSum(1, 2));
};
