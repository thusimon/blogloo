export const groupBy = (arr: Object[], key: string): { [key: string]: [] } => arr.reduce((group: any, obj: any) => {
  const keyVal = obj[key];
  group[keyVal] = group[keyVal] ?? [];
  group[keyVal].push(obj);
  return group;
}, {});
