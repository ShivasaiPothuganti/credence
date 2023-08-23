import { CapitalizeTextPipe } from './capitalize-text.pipe';

describe('CapitalizeTextPipe', () => {
  it('create an instance', () => {
    const pipe = new CapitalizeTextPipe();
    expect(pipe).toBeTruthy();
  });
});
