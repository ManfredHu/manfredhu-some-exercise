function init() {
  const input = document.querySelector('.input');
  const output = document.querySelector('.output');
  const close = document.querySelector('.close');
  const channel = Math.random();

  const supportsRequestStreams = (() => {
    let duplexAccessed = false;
    
    const hasContentType = new Request('', {
      body: new ReadableStream(),
      method: 'POST',
      get duplex() {
        duplexAccessed = true;
        return 'half';
      },
    }).headers.has('Content-Type');
    
    console.log({ duplexAccessed, hasContentType });
    
    return duplexAccessed && !hasContentType;
  })();

  if (!supportsRequestStreams) {
    output.textContent = `It doesn't look like your browser supports request streams.`;
    return;
  }

  const stream = new ReadableStream({
    start(controller) {
      input.addEventListener('input', (event) => {
        event.preventDefault();
        controller.enqueue(input.value);
        input.value = '';
      });
      
      close.addEventListener('click', () => controller.close());
    }
  }).pipeThrough(new TextEncoderStream());

  fetch(`/send?channel=${channel}`, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body: stream,
    duplex: 'half',
  });

  fetch(`/receive?channel=${channel}`).then(async res => {
    const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) return;
      output.append(value);
    }
  });
}

init();