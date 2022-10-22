setTimeout(() => {
  console.log(
    `Generated ${
      (Math.random() * 100) ^ (Math.random() * 100)
    } at ${new Date().toTimeString()}`
  );
}, 500);
