import { HospitalPipe } from './hospital.pipe';

describe('HospitalPipe', () => {
  it('create an instance', () => {
    const pipe = new HospitalPipe();
    expect(pipe).toBeTruthy();
  });
});
