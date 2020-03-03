import { INamespace } from './types';

const namespace: INamespace = (key?: string): string => (key || '').replace(/@/g, '').replace(/[/_]/g, '-').toUpperCase();

export default namespace;
