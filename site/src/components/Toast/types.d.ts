import { Placement, ToastOptions } from '@zag-js/toast';

type MaybeFunction<Value, Args> = Value | ((arg: Args) => Value);
export type ToastContext = {
  count: number;
  isVisible(id: string): boolean;

  create(options: ToastOptions): string | undefined;

  upsert(options: ToastOptions): string | undefined;

  dismiss(id?: string): void;

  remove(id?: string): void;

  dismissByPlacement(placement: Placement): void;

  update(id: string, options: ToastOptions): string | undefined;

  loading(options: ToastOptions): string | undefined;

  success(options: ToastOptions): string | undefined;
  info(options: ToastOptions): string | undefined;

  error(options: ToastOptions): string | undefined;

  promise<T>(
    promise: Promise<T>,
    options: {
      loading: ToastOptions;
      success: MaybeFunction<ToastOptions, T>;
      error: MaybeFunction<ToastOptions, Error>;
    },
    shared?: ToastOptions,
  ): Promise<T>;

  pause(id?: string): void;

  resume(id?: string): void;
};
