import { TruncateDatePipe } from './truncate-date.pipe';

describe('TruncateDatePipe', () => {
  it('create an instance', () => {
    const pipe = new TruncateDatePipe();
    expect(pipe).toBeTruthy();
  });
});
