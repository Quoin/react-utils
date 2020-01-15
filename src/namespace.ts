export interface INamespace {
  (s?: string): string
}

export default (key: string): string => key.replace(/@/g, '').replace(/[/_]/g, '-').toUpperCase();
