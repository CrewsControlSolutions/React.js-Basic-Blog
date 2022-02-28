import { Dispatch, SetStateAction } from 'react';
import { StorageObj } from './common';
declare function useStorageState<S>(storage: StorageObj, key: string, defaultState: S | (() => S)): [S, Dispatch<SetStateAction<S>>, Error | undefined];
declare function useStorageState<S>(storage: StorageObj, key: string): [S | null, Dispatch<SetStateAction<S | null>>, Error | undefined];
export default useStorageState;
