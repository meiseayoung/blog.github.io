export const pipe = (...fns) => source => fns.reduce((acc,fn) => fn(acc),source);  
