import ServiceError from "@/services/errors/ServiceError";
export interface ErrorState<> {
    errors: Array<ServiceError>
}
