export interface CreateSuccessService<T = number> {
    success: boolean;
    code: number;
    data: T;
}