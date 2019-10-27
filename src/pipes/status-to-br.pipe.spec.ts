import { StatusToBrPipe } from './status-to-br.pipe';

describe('StatusToBrPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusToBrPipe();
    expect(pipe).toBeTruthy();
  });
});
