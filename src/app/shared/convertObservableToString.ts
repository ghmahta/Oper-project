import {Observable} from 'rxjs';

export function convertObservableToString(observable$:Observable<string>){
  let output: string = '';
  observable$.subscribe(value=>output=value);
  return output;
}
