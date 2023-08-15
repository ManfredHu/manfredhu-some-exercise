setTimeout(() => {
  const dummy = 1;
  throw new Error('uncaught exception');
}, 1000);