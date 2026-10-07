export interface SuccessService<T> {
    success: boolean;
    code: number;
    data: T;
}