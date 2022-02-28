import { Reducer, Dispatch } from 'react';
import { StorageObj } from './common';
declare function useStorageReducer<S, A>(storage: StorageObj, key: string, reducer: Reducer<S, A>, defaultState: S): [S, Dispatch<A>, Error | undefined];
declare function useStorageReducer<S, A, I>(storage: StorageObj, key: string, reducer: Reducer<S, A>, defaultInitialArg: I, defaultInit: (defaultInitialArg: I) => S): [S, Dispatch<A>, Error | undefined];
export default useStorageReducer;
