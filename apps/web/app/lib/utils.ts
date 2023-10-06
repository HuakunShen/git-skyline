export function range(n: number, m: number): number[] {
  const result: number[] = [];
  for (let i = n; i <= m; i++) {
    result.push(i);
  }
  return result;
}
